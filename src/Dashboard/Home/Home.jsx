import React, { useEffect, useState } from 'react';
import DoughnutChart from '../../Components/Doughnut';
import { fetchProfile } from '../../api/userauth';
import { ApiArray } from '../../api/ApiResponse';
import Gemini from '../Gemini/Gemini';
function Home() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [lastTwoApiCalls, setLastTwoApiCalls] = useState([]);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const profileData = await fetchProfile();
        setUserData(profileData);
        const apiHistoryData = await ApiArray();
        const apiCalls = apiHistoryData?.data || [];

     
        const recentApiCalls = apiCalls.slice(-2);

        setLastTwoApiCalls(recentApiCalls);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    getUserData();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>Error fetching data: {error.message}</h2>;
  }

  return (
    <>
      <div className="min-h-[90vh] flex flex-col gap-4">
        <div className="flex h-[40vh]  gap-4 mx-4">
          <div className="bg-gray-300 w-[50%] p-6 rounded-lg shadow-lg break-words drop-shadow-xl">
            {userData && (
              <>
                <h2 className="text-xl mb-4"> 👋 Hi {userData.user.username}</h2>
                <h2 className='font-bold ml-2 my-2'>  {userData.user.email}</h2>
                <h2 className='font-bold ml-2 my-2'>Joined <br/>
  {new Date(userData.user.createdAt).toLocaleString()}
</h2>
                <h2 className='font-bold ml-2 my-2'>Last Updated <br/>
  {new Date(userData.user.updatedAt).toLocaleString()}
</h2>

              </>
            )}
          </div>

          <div className="bg-prShade w-[50%] p-6 rounded-lg shadow-lg drop-shadow-xl overflow-y-auto max-h-100 break-words">
  {lastTwoApiCalls.length > 0 && (
    <>
      {lastTwoApiCalls.map((apiCall, index) => (
        <div key={index}>
          <p><strong>URL </strong> {apiCall.url}</p>
          <p><strong>Method </strong> {apiCall.method}</p>
          <p><strong>Response Time </strong> {apiCall.responseTime} ms</p>
          <p><strong>Created At </strong> {new Date(apiCall.createdAt).toLocaleString()}</p>
          <hr className="my-2" />
        </div>
      ))}
    </>
  )}
</div>

        </div>

       
    
          <div className=" h-[50vh] p-6 rounded-lg shadow-lg flex-grow mx-4 backdrop-blur-lg bg-opacity-30">

          <Gemini/>
        </div>
      </div>
    </>
  );
}

export default Home;
