import React, { useState, useEffect } from 'react';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import DoneIcon from '@mui/icons-material/Done';
import { ApiInfo } from '../../api/ApiResponse';

function Contacts() {
  const [url, setUrl] = useState('');
  const [submittedUrl, setSubmittedUrl] = useState(''); // New state to track the submitted URL
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);
  const [responseHeaders, setResponseHeaders] = useState(null);
  const [responseTime, setResponseTime] = useState(null);
  const [responseStatus, setResponseStatus] = useState(null);

  // Use effect to fetch data only when the submitted URL changes
  useEffect(() => {
    const fetchData = async () => {
      if (submittedUrl) {
        setIsLoading(true);
        setError(null);

        try {
          const data = await ApiInfo({ url: submittedUrl });
          console.log(data,"pppp")
          if (data) {
            setResponse(data.responseBody);
            setResponseHeaders(data.responseHeaders);
            setResponseStatus(data.statusCode);
            setResponseTime(data.responseTime);
            console.log(responseStatus,responseTime,"00000000")
          }
        } catch (err) {
          setError(err.message || 'An error occurred');
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchData();
  }, [submittedUrl]); // Fetch data whenever the submitted URL changes

  const handleUrl = (e) => {
    e.preventDefault();
    setSubmittedUrl(url); // Update the submitted URL, which triggers useEffect
  };

  const responseArrayLength = Array.isArray(response) ? response.length : 0;

  return (
    <div className="p-6 pt-4 border-2 w-full">
      <form className="flex items-center justify-between" onSubmit={handleUrl}>
        <input
          placeholder="Enter URL"
          className="p-2 border font-semibold text-blue-400 border-gray-300 rounded w-[70%]"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        <button
          type="submit"
          className="p-2 rounded text-white bg-gray-400 hover:bg-black w-[10%]"
        >
          <DoneIcon />
        </button>
        <button
          type="button"
          className="p-2 rounded text-white bg-gray-400 hover:bg-black w-[10%]"
          onClick={() => console.log("Save clicked")}
        >
          <BookmarkIcon />
        </button>
      </form>

      <div className="mt-4 p-4">
        {isLoading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {response && responseHeaders && (
          <div className="mt-4 space-y-4">
            <div className="p-4 bg-gray-100 rounded-md">
              <p><strong className='text-green-700'>Status:</strong> {responseStatus || 'Unknown'}</p>
              <p><strong className='text-blue-700'>Message:</strong> {response.message || 'No message'}</p>
              <p><strong className='text-red-700'>Response Time:</strong> {responseTime}\</p>
              <p><strong className='text-red-700'>Data Length:</strong> {responseArrayLength}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-black text-red-500 p-4 rounded-md bg-white overflow-auto max-h-64 box-border">
                <h4 className="font-bold text-purple-400">Response Headers</h4>
                <pre className="whitespace-pre-wrap break-words overflow-wrap">
                  {JSON.stringify(responseHeaders, null, 2)}
                </pre>
              </div>

              <div className="p-4 bg-black text-purple-400 rounded-md bg-white overflow-auto max-h-64 box-border">
                <h4 className="font-bold text-red-500">Response Data</h4>
                <pre className="whitespace-pre-wrap break-words overflow-wrap">
                  {JSON.stringify(response, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Contacts;
