import { useEffect, useState } from "react";
import FeedPosts from "../components/GetPost";
import Nav from "../components/Nav";
import MakePost from "../components/MakePost";
import GetPost from "../components/GetPost";
import MakeComment from "../components/MakeComment";

const Home = ({setLogin}) => {
  const [feedData, setFeedData] = useState([]);
  const [comments, setComments] = useState([])

  const fetchData = async () => {
    try {
      const response = await fetch("https://localhost:7000/SocialMedia/post", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }, // Set the Authorization header
        // ... any other headers
      });
      if (response.ok) {
        const jsonData = await response.json();
        console.log(jsonData);
        setFeedData([...jsonData]);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error during data fetching:", error);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await fetch("https://localhost:7000/SocialMedia/comment", {
        /* headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },  */// Set the Authorization header
        // ... any other headers
      });
      if (response.ok) {
        const jsonData = await response.json();
        console.log(jsonData);
        setComments([...jsonData]);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error during data fetching:", error);
    }
  };


  useEffect(() => {
    fetchComments();
    fetchData();
    
  }, [setLogin]);


  // Update state when post is made
  const handlePostSubmit = () => {
    fetchComments();
    fetchData(); 
  };

  return (
    <>
      
      <Nav setLogin={setLogin}/>
      <MakePost onPostSubmit={handlePostSubmit}/>
      
      <GetPost feedData={feedData} comments={comments} handlePostSubmit={handlePostSubmit} />
      
    </>
  );
};

export default Home;
