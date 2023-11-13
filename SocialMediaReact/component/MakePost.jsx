import React from "react";
import { useState } from "react";

const MakePost = ({ userCredentials }) => {
  const [message, setMessage] = useState("");

  const handleMessage = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userPost = {
      firstName: userCredentials.firstName,
      lastName: userCredentials.lastName,
      message: message,
      liked: 0,
      userId: localStorage.getItem("userId"),
    };

    try {
      console.log(userPost);
      const response = await fetch("https://localhost:7000/SocialMedia", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userPost),
      });

      if (response.ok) {
        console.log("Post created successfully");
      } else {
        console.error("Failed to create the post");
      }
    } catch (error) {
      console.error("Error during POST request:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Message"
          value={message}
          onChange={handleMessage}
        />

        <button>Post</button>
      </form>
    </div>
  );
};

export default MakePost;
