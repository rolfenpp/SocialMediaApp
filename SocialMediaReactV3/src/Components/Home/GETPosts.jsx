import { useEffect, useState } from "react";
import styled from "styled-components"
import axios from "axios";
import POSTComment from "./POSTComment";

const PostWrapper = styled.div `
<<<<<<< HEAD
=======
    display: flex;
    flex-direction: column;

>>>>>>> cc42625fa75644a65e711c7ba849fcc562d5f988
    margin-bottom: 30px;
    width: 100%;
    padding: 10px;
    background-color: #397541;

`
const PostText = styled.p`
  color: #e8e8e8; 
  margin: 10px 0;
`;
const PostTime = styled.p `
    font-size: 80%;
    color: #c2c2c2;
`
const CommentsWrapper = styled.div `
    /* background-color: #2b5c31; */
`
const NameWrapper = styled.div`
    font-size: 120%;
    font-weight: bold;
    color: #ffffff;
`
const GETPosts = () => {
    const [wallPosts, setWallPosts] = useState([])
    const [wallComments, setWallComments] = useState([]);

    const GetWallPosts = async () => {
        try {
          const response = await axios.get("https://localhost:7000/SocialMedia/post", {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }, // Set the Authorization header
          });
          if (response.status === 200) {
            const jsonData = response.data;
            console.log(jsonData);
            setWallPosts([...jsonData]);
          } else {
            console.error("Failed to fetch data");
          }
        } catch (error) {
          console.error("Error during data fetching:", error);
        }
      };
      const GetWallComments = async () => {
        try {
          const response = await axios.get("https://localhost:7000/SocialMedia/comment", {
            /* headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },  */// Set the Authorization header
          });
          if (response.status === 200) {
            const jsonData = response.data;
            console.log(jsonData);
            setWallComments([...jsonData]);
          } else {
            console.error("Failed to fetch data");
          }
        } catch (error) {
          console.error("Error during data fetching:", error);
        }
      };

      useEffect(() => {
        GetWallPosts();
        GetWallComments();
      }, []);

      const handlePostSubmit = () => {
        GetWallPosts();
        GetWallComments();
      }

<<<<<<< HEAD
    return <div>
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
          <p></p>
=======
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
>>>>>>> cc42625fa75644a65e711c7ba849fcc562d5f988
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
          <POSTComment  postId={post.id} handlePostSubmit={handlePostSubmit} />
        </PostWrapper>
      ))}
    </>
}

export default GETPosts