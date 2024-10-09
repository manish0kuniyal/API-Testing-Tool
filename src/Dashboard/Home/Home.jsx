import React, { useEffect, useState } from 'react';
import DoughnutChart from '../../Components/Doughnut';
import { fetchProfile } from '../../api/userauth';

function Home() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = await fetchProfile();
        setUserData(data);
        console.log(data);
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
    return <h2>Error fetching user data: {error.message}</h2>;
  }

  return (
    <>
      {userData && <h2>hi {userData.user.username}</h2>}
      {userData && <h2>{userData.user.email}</h2>}
    </>
  );
}

export default Home;
