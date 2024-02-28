import { useState } from "react";
import axios from "axios";

const POSTComment = ({ postId, handlePostSubmit }) => {
  const [comment, setComment] = useState("");

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (comment.length >= 3) {
      const userComment = {
        Text: comment,
        UserId: localStorage.getItem("userId"),
        PostId: postId,
      };
      try {
        console.log(userComment);
        const response = await axios.post(
          "https://localhost:7000/socialmedia/comment",
          userComment,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 201) {
          console.log(userComment);
          console.log("Comment created successfully");
          handlePostSubmit();
        } else {
          console.error("Failed to create the comment");
        }
      } catch (error) {
        console.error("Error during POST request:", error);
      }
    } else {
      alert("Comment must contain at least 3 characters.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={comment}
        type="text"
        placeholder="comment"
        onChange={handleChange}
      />
      <button>Comment</button>
    </form>
  );
};

export default POSTComment;