import { useState } from "react"


const MakeComment = () => {
    const [comment, setComment] = useState("")

    const handleChange = () => {
        setComment(comment)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
    
         {
          const userPost = {
            Text: comment,
            UserId: localStorage.getItem("userId"),
            PostId: 1
          };
    
          try {
            console.log(userPost);
            const response = await fetch("https://localhost:7000/SocialMedia/comment", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(userPost),
            });
    
            if (response.ok) {
              console.log("Post created successfully");
              /* setPosts(!posts); */
              setComment("");
              /* onPostSubmit(); */
            } else {
              console.error("Failed to create the post");
            }
          } catch (error) {
            console.error("Error during POST request:", error);
          }
        }
      };
    
    return(
    
    <form onSubmit={handleSubmit}>
        <input value={comment} type="text" placeholder="comment" onChange={handleChange} />
        <button>Comment</button>
    </form>)
}