import { useEffect, useState } from "react";
import FeedPosts from "../components/GetPost";
import Nav from "../components/Nav";
import MakePost from "../components/MakePost";
import GetPost from "../components/GetPost";

const Home = ({setLogin}) => {
  const [feedData, setFeedData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch("https://localhost:7000/SocialMedia", {
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


  useEffect(() => {
    fetchData();
  }, [setLogin]);

  // Update state when post is made
  const handlePostSubmit = () => {
    fetchData(); 
  };

  return (
    <>
      <Nav setLogin={setLogin}/>
      <MakePost onPostSubmit={handlePostSubmit}/>
      <GetPost feedData={feedData} />
    </>
  );
};

export default Home;
