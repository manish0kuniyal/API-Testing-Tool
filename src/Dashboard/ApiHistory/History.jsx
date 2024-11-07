import React from 'react'
import { useState, useEffect } from "react";
import { ApiArray } from '../../api/ApiResponse'

function History() {
  const [apiHistory, setApiHistory] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getApiHistory = async () => {
      const data = await ApiArray();
      if (data) {
        setApiHistory(data.data); // Assuming 'data' is the field with the API calls array
      } else {
        setError("Failed to fetch API history");
      }
    };

    getApiHistory();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!apiHistory) {
    return <div>Loading API history...</div>;
  }

  return (
    <div>
      <h1>User API History</h1>
      <ul>
        {apiHistory && apiHistory.length > 0 ? (
          apiHistory.map((api, index) => (
            <li key={index}>{api}</li> // Assuming api is just a string, modify if it's more complex
          ))
        ) : (
          <p>No API history found for this user.</p>
        )}
      </ul>
    </div>
  );
};

export default History