import { useState, useEffect } from "react";
import MakeComment from "./MakeComment";

const GetPost = ({ feedData, comments, handlePostSubmit }) => {


  return (
    <div>
      {feedData.map((post) => (
        <div key={post.id}>
          <p>
            {post.firstName} - {post.lastName}
          </p>
          <p>{post.message}</p>
          <p>{post.createdAt}</p>
          <div>
            
          <div>
            {comments.filter(comment => comment.postId === post.id).map((comment) => (
              <div key={comment.id}>
                
                <p>{comment.firstName} {comment.lastName}</p>
                <p>{comment.text} </p>
                
              </div>
            ))}
          </div>

          </div>
          <MakeComment postId={post.id} handlePostSubmit={handlePostSubmit} />
        </div>
        
      ))}
      
    </div>
  );
};

export default GetPost;
