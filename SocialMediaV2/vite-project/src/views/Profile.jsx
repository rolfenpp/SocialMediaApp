const Profile = () => {
  const [profile, setProfile] = useState([]);

  const fetchUserData = async () => {
    try {
      const response = await fetch(
        `https://localhost:7000/auth/${localStorage.getItem("userId")}`
      );
      if (response.ok) {
        const jsonData = await response.json();
        console.log(jsonData);
        setProfile([...jsonData]);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error during data fetching:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return <>ProfileInfo</>;
};

export default Profile;
