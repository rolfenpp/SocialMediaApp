import React from "react";
import "../component/FeedGet.css";

const FeedGet = (props) => {
  const handleClick = async () => {
    try {
      // Make a POST request to the server endpoint to increment the liked count
      const response = await fetch(
        `https://localhost:7000/SocialMedia/${props.id}/like`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // Include any additional data needed for the like operation
          }),
        }
      );

      if (response.ok) {
        // The like operation was successful, you can update the UI or state if necessary
        console.log("Post liked successfully");
      } else {
        // Handle the error condition
        console.error("Failed to like the post");
      }
    } catch (error) {
      console.error("Error during POST request:", error);
    }
  };

  return (
    <div key={props.id} className="post-container">
      <div className="post-container-name">
        <div>😊</div>
        <div>
          {" "}
          {props.firstName} {props.lastName}
        </div>
      </div>

      <div className="post-container-msg">{props.message}</div>

      <div className="post-container-comment-like">
        <button className="post-comment">comment</button>
        <button onClick={() => console.log("id:" + props.id)}>LogId</button>
        <button className="post-like" onClick={handleClick}>
          {props.liked}👍
        </button>
      </div>

      {/* <button onClick={() => console.log(localStorage.getItem("userId"))}>
        Check Id
      </button> */}
    </div>
  );
};

export default FeedGet;
