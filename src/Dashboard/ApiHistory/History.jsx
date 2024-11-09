import React, { useState, useEffect } from "react";
import { ApiArray } from '../../api/ApiResponse';

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
      <h1 className="ml-[5%] font-bold "> API History</h1>
      <ul className="flex flex-wrap">
        {apiHistory && apiHistory.length > 0 ? (
          apiHistory.map((api, index) => (
            <li className=" bg-[#dedede] p-2 rounded-xl bg- m-4" key={index}>
              <p className="mb-2 "><strong className="bg-red-300 p-1 text-sm rounded-md">Endpoint</strong  > <span className="underline text-blue-500">{api.url}</span>
              </p>
              <p className="mb-2 text-green-500"><strong className="bg-green-500  p-1 text-sm rounded-md text-black">Method</strong> {api.method}</p>
              <p className="mb-2 text-blue-800"><strong className="text-black bg-blue-500 p-1 text-sm rounded-md">Status</strong> {api.responseStatus}</p>
              <p className="mb-2 text-purple-400"><strong className=" text-black bg-violet-500 p-1 text-sm rounded-md">Response Time</strong> {api.responseTime}ms</p>
              <p className="mb-2 text-pink-500"><strong  className="text-black bg-pink-500  p-1 text-sm rounded-md">Summary</strong> {api.responseSummary}</p>
              <p><strong  className="text-black bg-yellow-500 p-1 text-sm rounded-md">Date</strong> {new Date(api.createdAt).toLocaleString()}</p>
              
            </li>
          ))
        ) : (
          <p>No API history found for this user.</p>
        )}
      </ul>
    </div>
  );
}

export default History;
