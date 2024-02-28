import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components"


const Form = styled.form`
  display: flex;
  width: 100%;
  margin: 20px 0px 30px 0px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #427c4e;
  padding: 20px;

  div {
    display: flex;
    justify-content: center;
    width: 100%;
  }
  input {
    width: 80%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    outline: none;
  }
  label {
    padding: 10px;
    font-size: 140%;
    color: #c7c7c7;
  }

  button {
    padding: 10px;
    background-color: #f90000;
    color: #ffffff;
    border: none;
    border-radius: 4px;

    cursor: pointer;
  }
`;


const POSTPost = ({ onPostSubmit }) => {
  const [message, setMessage] = useState("");

  const handleMessage = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (message.length >= 5) {
      const userPost = {
        message: message,
        userId: localStorage.getItem("userId"),
      };

      try {
        console.log(userPost);
        const response = await axios.post(
          "https://localhost:7000/SocialMedia/post",
          userPost,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          console.log("Post created successfully");
          setMessage("");
          onPostSubmit();
        } else {
          console.error("Failed to create the post");
        }
      } catch (error) {
        console.error("Error during POST request:", error);
      }
    } else {
      alert("Message must contain at least 10 characters!");
    }
  };

  return (
    <Form className="wallpost-form" onSubmit={handleSubmit}>
      <label htmlFor="">Tell us what you have been up to lately!</label>
      <div>
        <input
          type="text"
          placeholder="Message"
          value={message}
          onChange={handleMessage}
        />
        <button>Post</button>
      </div>
    </Form>
  );
};

export default POSTPost;