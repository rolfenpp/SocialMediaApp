import React from "react";
import { useState } from "react";


const MakePost = ({ onPostSubmit }) => {
    const [message, setMessage] = useState("");

    const handleMessage = (e) => {
        setMessage(e.target.value);
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (message.length >= 10) {
          const userPost = {
            message: message,
            userId: localStorage.getItem("userId"), // Who made the post
          };
    
          try {
            console.log(userPost);
            const response = await fetch("https://localhost:7000/SocialMedia/post", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(userPost),
            });
    
            if (response.ok) {
              console.log("Post created successfully");
              /* setPosts(!posts); */
              setMessage("");
              onPostSubmit();
            } else {
              console.error("Failed to create the post");
            }
          } catch (error) {
            console.error("Error during POST request:", error);
          }
        } else {
          alert("Message must contain atleast 10 characters!");
        }
      };

      return (
        <form className="wallpost-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Message"
            value={message}
            onChange={handleMessage}
          />
          <button>Post</button>
        </form>
      );
    };

export default MakePost