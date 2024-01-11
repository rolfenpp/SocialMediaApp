import React from "react";
import { useState, useEffect } from "react";
import FeedPost from "./FeedGet";
import MakePost from "./MakePost";
import FeedGet from "./FeedGet";
import "../component/Feed.css";

const Feed = ({ userCredentials, setLoggedIn }) => {
  const [feedData, setFeedData] = useState([]);
  const [username, setUsername] = useState(null);
  const [posts, setPosts] = useState(false);

  const fetchUser = () => {
    const userId = localStorage.getItem("userId");
    fetch(`https://localhost:7000/auth/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("username", data.userName);
        setUsername(data.userName);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  };

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
        /* console.log("feedData: " + feedData.map((x) => x.id)); */
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error during data fetching:", error);
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setLoggedIn(false);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    fetchData();
  }, [posts]);

  return (
    <div className="postpage-container">
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
      <div className="makepost-input">
        <MakePost
          userCredentials={userCredentials}
          setPosts={setPosts}
          posts={posts}
        />
      </div>
      <div className="feed-container">
        {feedData.map((x) => (
          <FeedGet
            key={x.id}
            id={x.id}
            message={x.message}
            liked={x.liked}
            firstName={x.firstName}
            lastName={x.lastName}
            fedData={feedData}
          />
        ))}
      </div>
    </div>
  );
};

export default Feed;
