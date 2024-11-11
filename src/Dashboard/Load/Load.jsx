import React, { useState } from 'react';
import axios from 'axios';

function LoadTest() {
  const [apiUrl, setApiUrl] = useState('');
  const [numRequests, setNumRequests] = useState(2);
  const [responses, setResponses] = useState([]);
  const [responseData, setResponseData] = useState(null); 
    const [loading, setLoading] = useState(false);

  const handleLoadTest = async () => {
    setLoading(true);
    setResponses([]); 
    setResponseData(null); 

    const requestCount = Math.max(2, Math.min(numRequests, 20));  let newResponses = [];

    for (let i = 1; i <= requestCount; i++) {
      const startTime = Date.now();
      try {
        const response = await axios.get(apiUrl);
        const endTime = Date.now();
        const responseTime = endTime - startTime;

        if (i === 1) {
          setResponseData(response.data);   }

        newResponses.push({
          requestNum: i,
          status: response.status,
          responseTime,
          error: null,
        });
      } catch (error) {
        const endTime = Date.now();
        const responseTime = endTime - startTime;

        newResponses.push({
          requestNum: i,
          status: error.response ? error.response.status : 'N/A',
          responseTime,
          error: error.message,
        });
      }
      setResponses([...newResponses]); }

    setLoading(false);
  };

  return (
    <div className="p-6 max-w-md flex flex-wrap items-center">
      <h1 className="text-xl font-bold mb-4">API Load Test</h1>
      
      <input
        type="text"
        placeholder="Enter API URL"
        className="w-full p-2 mb-2 font-bold border  text-blue-600  rounded"
        value={apiUrl}
        onChange={(e) => setApiUrl(e.target.value)}
      />
      <h1 className='mb-2 font-bold'>Number of Requests</h1>
      <input
        type="number"
        min="2"
        max="20"
        className="w-full p-2 mb-4 border  bg-black text-white rounded"
        value={numRequests}
        onChange={(e) => setNumRequests(Number(e.target.value))}
      />
      
      <button
        className="w-full bg-purple-600  text-white p-2 rounded"
        onClick={handleLoadTest}
        disabled={!apiUrl || loading}
      >
        {loading ? 'Testing...' : 'Start Load Test'}
      </button>
      
      <div className="mt-4">
        <div className="space-y-4">
          {responses.map((response, index) => (
            <div key={index} className=" flex justify-between  bg-white rounded  ">
              <div className="w-1/3 bg-black rounded text-white p-2">
                <strong>Request {response.requestNum}</strong>
              </div>
              <div className="w-1/3 bg-blue-600 rounded text-white p-2">
                <strong>Status </strong> {response.status}
              </div>
              <div className="w-2/3 bg-green-600  rounded text-white p-2 ">
                <strong>Response Time</strong> {response.responseTime} ms
              </div>
            </div>
          ))}
        </div>


        {responses.length === numRequests && responseData && (
  <div className="mt-6">
    <div className="p-4  rounded bg-gray-100">
      <strong>Response Data:</strong>
      <div className="mt-2 p-2 max-h-64 overflow-y-auto overflow-x-auto bg-black text-red-500">
        <pre className="whitespace-pre-wrap break-words text-sm font-mono">
          {JSON.stringify(responseData, null, 2)}
        </pre>
      </div>
    </div>
  </div>
)}


      </div>
    </div>
  );
}

export default LoadTest;
