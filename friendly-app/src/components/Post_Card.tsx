import {ReactElement} from "react";
import { Post } from "./Post.interface";
import { Link } from "react-router-dom";
import "./Post_Card.css"

type PostCardProps ={
  post: Post
}

export const Post_Card =({post} : PostCardProps) : ReactElement =>{
  return (
    <>
      <div className="vertical container-base center post-container">
        <div className=" post-header horizontal center">
          <Link to={"/profile/" + post.user} className="horizontal center">
          <img src="../../public/images/account_circle.png" alt="" />
          <p className="username-label">{post.user}</p>
          </Link>
          <p className="date-label">Posted on {post.date}</p>
        </div>
        <div className="line"></div>
        <p className="post-content"> {post.content}</p>
      </div>
    </>
  )
}