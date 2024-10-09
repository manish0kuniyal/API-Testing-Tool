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
        },
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
            },
            body:JSON.stringify(userData)
        })
            if(!response.ok){
                const error=await response.json()
                throw new Error(error.error|| 'Failed to create user');
            }
            const data = await response.json();
            console.log(data.token)
            
        document.cookie=`access_token=${data.token}; path=/; SameSite=Lax;`;
            return data;
    }
    catch(err){
        console.log("Error during login:",err);
        return null;
    }
}

export const fetchProfile = async () => {
  try {
    // Make the GET request to the profile route
    const response = await fetch(
      `${API_BASE_URL}/profile`
      // `http://localhost:3000/user/profile`
      , {
      method: 'GET',
      credentials: 'include', // Important to include credentials (cookies)
      headers: {
        'Content-Type': 'application/json',
      },
    });

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

