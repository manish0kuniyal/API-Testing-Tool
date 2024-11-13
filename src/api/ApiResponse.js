const API_BASE_URL="https://dashboardbackendmain.vercel.app/user"
// const API_BASE_URL="http://localhost:3000/user"


const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};

export const ApiInfo = async (userData) => {
    try {
      
    const token = getCookie('access_token');
      const response = await fetch(
      `${API_BASE_URL}/apiUrl`,
        {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },credentials: 'include', 
        body: JSON.stringify(userData)
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw errorData;
      }
  
      const data = await response.json();
      return data;
    } catch (err) {
      console.log("Error during user creation:", err);
      return { error: err.message || 'Failed to fetch API', details: err }; 
    }
  };
  

  export const ApiArray = async () => {
    try {
      
    const token = getCookie('access_token');
    if (!token) {
      throw new Error("No token found");
    }
      const response = await fetch(
      `${API_BASE_URL}/apiHistory`,
        {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },credentials: 'include', 
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch APIHistory');
      }
  
      const data = await response.json();
      console.log(data)
      return data;
    } catch (err) {
      console.log("Error during user creation:", err);
      return null; 
    }
  };
  
