import { useState } from "react"


const MakeComment = ({postId}) => {
    const [comment, setComment] = useState("")

    const handleChange = (e) => {
        setComment(e.target.value)
    }

    const handleSubmit = async (e) => {
        console.log(postId)
        e.preventDefault();
    
         {
          const userComment = {
            Text: comment,
            UserId: localStorage.getItem("userId"),
            PostId: postId
          };
    
          try {
            console.log(userComment);
            const response = await fetch("https://localhost:7000/socialmedia/comment", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(userComment),
            });
    
            if (response.ok) {
              console.log(userComment)
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

export default MakeComment