import { useEffect } from "react"
import WallPosts from "./WallPosts"
import POSTPost from "./POSTPost"
import { useState } from "react"
import axios from "axios";


const WallPage = () => {
    const [wallPosts, setWallPosts] = useState([])
    const [wallComments, setWallComments] = useState([]);

    const GetWallPosts = async () => {
        try {
          const response = await axios.get("https://localhost:7000/SocialMedia/post", {
            /* headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }, */ // Set the Authorization header
          });
          if (response.status === 200) {
            const jsonData = response.data;
            console.log(jsonData);
            setWallPosts([...jsonData]);
          } else {
            console.error("Failed to fetch data");
          }
        } catch (error) {
          console.error("Error during data fetching:", error);
        }
      };
      const GetWallComments = async () => {
        try {
          const response = await axios.get("https://localhost:7000/SocialMedia/comment", {
            /* headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },  */// Set the Authorization header
          });
          if (response.status === 200) {
            const jsonData = response.data;
            console.log(jsonData);
            setWallComments([...jsonData]);
          } else {
            console.error("Failed to fetch data");
          }
        } catch (error) {
          console.error("Error during data fetching:", error);
        }
      };

      const updateWall = () => {
        GetWallPosts();
        GetWallComments();
      }
      useEffect(() => {
        updateWall();
      }, []);
    
    return(
    <>
        <POSTPost updateWall={updateWall}/>
        <WallPosts wallPosts={wallPosts} wallComments={wallComments} updateWall={updateWall}/>
    </>)
}
export default WallPage;