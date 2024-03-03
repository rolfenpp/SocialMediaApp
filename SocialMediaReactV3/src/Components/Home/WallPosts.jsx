import { useEffect, useState } from "react";
import styled from "styled-components"
import axios from "axios";
import POSTComment from "./POSTComment";

const PostWrapper = styled.div `
    margin-bottom: 30px;
    width: 100%;
    padding: 10px;
    background-color: #397541;
`;
const PostText = styled.p`
  color: #e8e8e8; 
  margin: 10px 0;
`;
const PostTime = styled.p `
    font-size: 80%;
    color: #c2c2c2;
`;
const CommentsWrapper = styled.div `
    /* background-color: #2b5c31; */
`;
const NameWrapper = styled.div`
    font-size: 120%;
    font-weight: bold;
    color: #ffffff;
`;
const WallPosts = ({wallPosts, wallComments, updateWall}) => {
 
    return <>
        {wallPosts.map((post) => (
          <PostWrapper key={post.id}>
            <NameWrapper>
              {post.firstName} {post.lastName} 
            </NameWrapper>
            <PostTime>
              {post.createdAt}
            </PostTime>
            <PostText>
              {post.message}
            </PostText>
          <div>
            <CommentsWrapper>
              {wallComments
                .filter((comment) => comment.postId === post.id)
                .map((comment) => (
                  <div key={comment.id}>
                    <p>{comment.firstName} {comment.lastName} - {comment.text}</p>
                  </div>
                ))}
            </CommentsWrapper>
          </div>
          <POSTComment postId={post.id} updateWall={updateWall}/>
        </PostWrapper>
      ))}
    </>
}

export default WallPosts;