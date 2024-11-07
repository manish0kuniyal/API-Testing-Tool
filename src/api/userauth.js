const API_BASE_URL="https://dashboardbackendmain.vercel.app/user"
// const API_BASE_URL="http://localhost:3000/user"
export const createUser = async (userData) => {
    try {
      const response = await fetch(
        // 'http://localhost:3000/user/signup', 
      `${API_BASE_URL}/signup`,
        {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },credentials: 'include', 
        body: JSON.stringify(userData),
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create user');
      }
  
      const data = await response.json();
      return data;
    } catch (err) {
      console.log("Error during user creation:", err);
      return null; 
    }
  };
  

export const loginuser=async(userData)=>{
    try{
        const response= await fetch(
          // 'http://localhost:3000/user/login'
         `${API_BASE_URL}/login`
          ,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },credentials: 'include', 
            body:JSON.stringify(userData)
        })
            if(!response.ok){
                const error=await response.json()
                throw new Error(error.error|| 'Failed to create user');
            }
            const data = await response.json();
            console.log("token",data.token)
            
            document.cookie = `access_token=${data.token}; path=/; max-age=${60 * 60 * 24 * 25};`; // 7 days in seconds


            return data;
    }
    catch(err){
        console.log("Error during login:",err);
        return null;
    }
}
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};

export const fetchProfile = async () => {
  try {
    const token = getCookie('access_token');
    
    if (!token) {
      console.error("Token not found in cookies");
      throw new Error("Unauthorized: Token not found");
    }
    
    console.log("Retrieved token:", token);

    // Make the GET request to the profile route
    const response = await fetch(
      `${API_BASE_URL}/profile`, // Ensure API_BASE_URL is defined or replace with your actual API URL
      {
        method: 'GET',
        credentials: 'include', // Important to include credentials (cookies)
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Ensure there’s a space after "Bearer"
        },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch profile');
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.log('Error fetching profile:', err);
    return null;
  }
};



export const UpdateUser = async (UserData) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/edituser`
      , {
      method: 'PUT',
      credentials: 'include', // Important to include credentials (cookies)
      headers: {
        'Content-Type': 'application/json',
      },
      body:JSON.stringify(UserData)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update profile');
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.log('Error Updating profile:', err);
    return null;
  }
};

