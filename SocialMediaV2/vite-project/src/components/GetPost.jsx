import { useState, useEffect } from "react";
import MakeComment from "./MakeComment";

const GetPost = ({ feedData, comments }) => {


  return (
    <div>
      {feedData.map((post) => (
        <div key={post.id} style={{ border: "1px solid red" }}>
          <p style={{ color: "green" }}>
            {post.firstName} - {post.lastName}
          </p>
          <p>{post.message}</p>
          <p>{post.createdAt}</p>
          <div>
            
          <div>
            {comments.filter(comment => comment.postId === post.id).map((comment) => (
              <div key={comment.id}>
                <p>{comment.userId} - {comment.text} </p>
                {/* Render other comment details here */}
              </div>
            ))}
          </div>

          </div>
          <MakeComment postId={post.id} />
        </div>
        
      ))}
      
    </div>
  );
};

export default GetPost;
