import React from "react";
import { useState } from "react";
import "../component/FeedGet.css";

const FeedGet = (props) => {
  const [likedCount, setLikedCount] = useState(props.liked);
  const [commentValue, setCommentValue] = useState();
  const handleClick = async () => {
    try {
      // Make a POST request to the server endpoint to increment the liked count
      const response = await fetch(
        `https://localhost:7000/SocialMedia/${props.id}/like`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Liked: 1,
          }),
        }
      );

      if (response.ok) {
        // The like operation was successful, you can update the UI or state if necessary
        setLikedCount(likedCount + 1);
        console.log("Post liked successfully");
      } else {
        // Handle the error condition
        console.error("Failed to like the post");
      }
    } catch (error) {
      console.error("Error during POST request:", error);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    console.log(localStorage.getItem("userId"));
    const comment = {
      UserId: localStorage.getItem("userId"),
      Liked: 0,
      CommentText: commentValue,
    };

    try {
      // Make a POST request to create a comment
      const makeComment = await fetch(
        `https://localhost:7000/SocialMedia/${props.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(comment),
        }
      );

      if (makeComment.ok) {
        console.log("Comment created successfully");
        // You might want to update the UI or state here if needed
      } else {
        console.error("Failed to create the comment");
      }
    } catch (error) {
      console.error("Error during POST request:", error);
    }

    // Clear the comment textarea after submitting
    setCommentValue("");
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
        <form onSubmit={handleComment}>
          <input
            value={commentValue}
            onChange={(e) => setCommentValue(e.target.value)}
            placeholder="comment.."
          ></input>
          <button type="submit">Comment</button>
        </form>

        <button onClick={() => console.log("id:" + props.id)}>Log Id</button>
        <button className="post-like" onClick={handleClick}>
          {likedCount}👍
        </button>
      </div>
    </div>
  );
};

export default FeedGet;
