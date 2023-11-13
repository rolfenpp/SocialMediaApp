export async function fetchUsername(userId) {
  try {
    const response = await fetch(`https://localhost:7000/auth/${userId}`);
    if (response.ok) {
      const userData = await response.json();
      return {
        userName: userData.userName,
        firstName: userData.firstName,
        lastName: userData.lastName,
      };
    } else {
      console.error(`Failed to fetch username for user ID: ${userId}`);
      return null; // Return null or handle the error appropriately
    }
  } catch (error) {
    console.error(`Error while fetching username: ${error}`);
    return null; // Return null or handle the error appropriately
  }
}
