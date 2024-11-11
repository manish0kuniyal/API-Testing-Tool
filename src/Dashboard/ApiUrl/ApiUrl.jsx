import React, { useState } from 'react';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import DoneIcon from '@mui/icons-material/Done';
import { ApiInfo } from '../../api/ApiResponse';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ApiUrl() {
  const [url, setUrl] = useState('');
  const [methods, setMethod] = useState("GET");
  const [JsonBody, setJsonBody] = useState("");
  const [authorization, setAuthorization] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);
  const [responseHeaders, setResponseHeaders] = useState(null);
  const [responseTime, setResponseTime] = useState(null);
  const [responseStatus, setResponseStatus] = useState(null);
  const [save, setSave] = useState(false);

  const fetchData = async () => {
    if (url) {
      setIsLoading(true);
      setError(null);
      setResponse(null); 
      setResponseHeaders(null);
      setResponseStatus(null);
      setResponseTime(null);
  
      try {
        const data = await ApiInfo({
          url,
          method: methods,
          headers: { Authorization: authorization },
          body: JsonBody,
          save,
        });
  
        if (data.error) {
          setError(data.error); 
          toast.error(`Failed to fetch data: ${data.error}`);
        } else {
          setResponse(data.responseBody);
          setResponseHeaders(data.responseHeaders);
          setResponseStatus(data.statusCode);
          setResponseTime(data.responseTime);
          toast.success('Data fetched successfully!');
        }
      } catch (err) {
        setError("An unexpected error occurred");
        toast.error('An unexpected error occurred');
      } finally {
        setIsLoading(false);
      }
    } else {
      setError("Please enter a valid URL");
      toast.error("Please enter a valid URL");
    }
  };
  
  const handleDoneClick = (e) => {
    e.preventDefault();
    if (!url) {
      toast.error("Please enter a valid URL");
      return;
    }
    setSave(false); 
    fetchData();     
  };

  const handleBookmarkClick = () => {
    if (!url) {
      toast.error("Please enter a valid URL");
      return;
    }
    setSave(true);
    toast.info('Saving the API data...');
  };

  return (
    <div className="p-6 pt-4 w-full">
      <ToastContainer />
      <form className=" flex flex-col items-center justify-between">
        <div className='w-[100%]  flex justify-center'>
          <input
            placeholder="Enter URL"
            className="p-2 underline border font-semibold text-blue-600 border-gray-300 rounded w-[70%] mr-2"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
          <select
            value={methods}
            onChange={(e) => setMethod(e.target.value)}
            className="p-2 rounded  bg-black text-white font-bold w-[20%]"
          >
            <option>GET</option>
            <option>POST</option>
            <option>PUT</option>
            <option>DELETE</option>
          </select>
        </div>
        <div className="mt-4 w-[100%]  flex flex-col items-center">
          <div className='flex  w-[100%] px-8'>
          <textarea
          placeholder="Enter JSON Body"
          className="h-auto p-2 bg-black text-red-600 border font-semibold text-blue-400 border-gray-300 rounded w-[70%] my-2 mr-4"
          value={JsonBody}
          onChange={(e) => setJsonBody(e.target.value)}
          rows={3}
        />
          <input
            placeholder="Enter authorization token/key etc"
            className="p-2 border font-semibold text-blue-400 border-gray-300 rounded w-[70%] my-2"
            value={authorization}
            onChange={(e) => setAuthorization(e.target.value)}
          />
</div>
          <div className="flex justify-center  w-[70%] mt-4">
            <button
              type="button"
              className="p-2 mr-2 rounded text-white bg-gray-400 hover:bg-black w-[25%]"
              onClick={handleDoneClick}
            >
              <DoneIcon /> 
            </button>
            <button
              type="button"
              className="p-2 rounded text-white bg-purple-600 hover:bg-green-600 w-[25%]"
              onClick={handleBookmarkClick}
            >
              <BookmarkIcon /> 
            </button>
          </div>
        </div>
      </form>

      <div className="mt-4 p-4">
        {isLoading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {response && responseHeaders && (
          <div className="mt-4 space-y-4">
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

export default ApiUrl;
