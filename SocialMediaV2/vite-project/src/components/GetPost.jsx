import { useState, useEffect } from "react";

const GetPost = ({ feedData }) => {


  return (
    <div>
      {feedData.map((post) => (
        <div key={post.id} style={{ border: "1px solid red" }}>
          <p style={{ color: "green" }}>
            {post.firstName} - {post.lastName}
          </p>
          <p>{post.message}</p>
          <p>{post.createdAt}</p>
        </div>
      ))}
    </div>
  );
};

export default GetPost;
