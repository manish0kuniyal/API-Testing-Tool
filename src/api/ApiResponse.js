const API_BASE_URL="https://dashboardbackendmain.vercel.app/user"
// const API_BASE_URL="http://localhost:3000/user"
export const ApiInfo = async (userData) => {
    try {
      const response = await fetch(
      `${API_BASE_URL}/apiUrl`,
        {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },credentials: 'include', 
        body: JSON.stringify(userData)
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch API');
      }
  
      const data = await response.json();
      return data;
    } catch (err) {
      console.log("Error during user creation:", err);
      return null; 
    }
  };
  
