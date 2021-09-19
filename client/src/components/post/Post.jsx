import { Link } from "react-router-dom";
import "./post.css";

export default function Post({post}) {
  const PF = "http://localhost:8000/images/"
  return (
    <div className="post">
      {
        post.photo &&
         <img
        className="postImg"
        src={PF + post.photo}
        alt=""
      />
      }
      <div className="postInfo">
        <div className="postCats">
          <span className="postCat">
            <Link className="link" to={`/posts?cat=${post.name}`}>
            {
              post.categories.map((c)=>(
                <span className="postCat"> {c.name}</span>
              ))
            }
            </Link>
          </span>
          
        </div>
        <span className="postTitle">
          <Link to={`/post/${post._id}`} className="link">
            {post.title}
          </Link>
        </span>
        <hr />
        <span className="postDate">{new Date(post.createdAt).toDateString()}</span>
      </div>
      <p className="postDesc">
      {post.desc}
      </p>
    </div>
  );
}
