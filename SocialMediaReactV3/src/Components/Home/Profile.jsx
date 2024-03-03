import { useEffect, useState } from "react";
import axios from "axios";
import Nav from "../Home/Nav"
import styled from "styled-components";
const profilePage = styled.div`
    height: 100px;
`

const Profile = () => {
    const [name, setName] = useState()
    const [lastName, setLastName] = useState()
    const [profile, setProfile] = useState([])
    const GetProfile = async () => {
        try {
          const response = await axios.get(`https://localhost:7000/SocialMedia/user/${localStorage.getItem("userId")}`, {
            /* headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }, */ // Set the Authorization header
          });
          if (response.status === 200) {
            const jsonData = response.data;
            console.log(jsonData);
            setProfile([jsonData.firstName, jsonData.lastName])
            console.log(profile)
          } else {
            console.error("Failed to fetch data");
          }
        } catch (error) {
          console.error("Error during data fetching:", error);
        }
      };
    useEffect(() => {
        GetProfile();
    }, [])
    return<>{name}{lastName}Profile</>
}

export default Profile;