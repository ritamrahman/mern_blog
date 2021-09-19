import axios from 'axios'
import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Context } from "../../context/Context"
import "./singlePost.css";

export default function SinglePost() {

  const location = useLocation()
  const [post, setPost] = useState({})
  const path = location.pathname.split("/")[2]
  const PF = "http://localhost:8000/images/"
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get(`/posts/${path}`)
      setPost(res.data);
      setTitle(res.data.title)
      setDesc(res.data.desc)
    }
    getPost()
  }, [path]);

  // delete function
  const handelDelete = async () => {
    try {
      await axios.delete(`/posts/${post._id}`, {
        data: { username: user.username }
      });
      window.alert("Post has been deleted");
      window.location.replace("/");
    } catch (error) {

    }
  };

  // Update function
  const handleUpdate = async () => {
    console.log(updateMode);
    try {
      // console.log(updateMode);
      await axios.put(`/posts/${post._id}`, {
        username: user.username,
        title,
        desc,
      });
      window.alert("Post updated successful..");
      window.location.reload()
    } catch (err) { }
    // window.alert("post has been updated")
  };




  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo && (
          <img src={PF + post.photo} alt="" className="singlePostImg" />
        )}
        {
          // if update mood on
          updateMode ? (
            <input
              type="text"
              value={title}
              className="singlePostTitleInput"
              autoFocus
              onChange={(e) => setTitle(e.target.value)}
            />
          ) : (
            // if update mood off
            <h1 className="singlePostTitle">
              {post.title}
              {/* if username dosen't match of post auther name thn hide this to buttons */}
              {
                post.username === user?.username && (
                  <div className="singlePostEdit">
                    <i className="singlePostIcon far fa-edit" onClick={(() => setUpdateMode(true))}></i>
                    <i className="singlePostIcon far fa-trash-alt" onClick={handelDelete}></i>
                  </div>
                )
              }

            </h1>
          )
        }

        <div className="singlePostInfo">
          <span>
            Author:
            <b className="singlePostAuthor">
              <Link className="link" to={`/posts?user=${post.username}`}>
                {post.username}
              </Link>
            </b>
          </span>
          <span>{new Date(post.createdAt).toDateString()}</span>
        </div>
        {
          updateMode ? (
            // if update mood on
            <textarea
              className="singlePostDescInput"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          ) : (
            // if update mood off
            <p className="singlePostDesc">
              {post.desc}
            </p>
          )
        }

        {/* if update mood on when only show this button */}
        {updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>
            Update
          </button>
        )}

      </div>
    </div>
  );
}
