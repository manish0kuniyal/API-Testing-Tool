// const API_BASE_URL="https://dashboardbackendmain.vercel.app/user"
const API_BASE_URL="http://localhost:3000/user"


const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};

export const GenerateJson = async (fields) => {
    try {
        const token = getCookie('access_token');
        console.log("Token:", token); // Check if token is correctly fetched

        const response = await fetch(`${API_BASE_URL}/generatejson`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ fields }), 
            credentials: 'include',
        });

        console.log("Response Status:", response.status);

        if (!response.ok) {
            const errorData = await response.text()
            console.log("Error Data:", errorData); 
            throw errorData;
        }

        const data = await response.text(); 
        console.log("Data:", data); 
        return data;
    } catch (err) {
        console.log("Error during Json Creation", err);
        return { error: err.message || 'Failed to fetch API', details: err };
    }
};
