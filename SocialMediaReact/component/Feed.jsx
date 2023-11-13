import React from "react";
import { useState, useEffect } from "react";
import FeedPost from "./FeedGet";
import MakePost from "./MakePost";
import FeedGet from "./FeedGet";
import "../component/Feed.css";

const Feed = ({ userCredentials, setLoggedIn }) => {
  const [feedData, setFeedData] = useState([]);
  const [username, setUsername] = useState(null);

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
      const response = await fetch("https://localhost:7000/SocialMedia");
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
  }, []);

  return (
    <div className="postpage-container">
      <button onClick={handleLogout}>Logout</button>
      <div className="makepost-input">
        <MakePost userCredentials={userCredentials} />
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
