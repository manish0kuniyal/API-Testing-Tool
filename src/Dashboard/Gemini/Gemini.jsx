import React, { useEffect, useState } from 'react';
import { GenerateJson } from '../../api/Gemini';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const Gemini = () => {
    const [jsonData, setJsonData] = useState(null);
    const [error, setError] = useState(null);
    const [fields, setFields] = useState([]);
    const [inputField, setInputField] = useState("");

    const handleInputChange = (e) => {
        setInputField(e.target.value);
    };

    const addField = () => {
        if (inputField.trim() !== "") {
            setFields([...fields, inputField]);
            setInputField("");
        }
    };

    const fetchJsonData = async () => {
        if (fields.length === 0) {
            setError("Please enter at least one field.");
            return;
        }

        const data = await GenerateJson(fields);
        if (data.error) {
            setError(data.error);
        } else {
            try {
                const cleanJson = data.replace(/```json\n|\n```/g, '').trim();
                const parsedJson = JSON.parse(cleanJson);
                setJsonData(parsedJson);
            } catch (err) {
                setError("Failed to parse JSON.");
            }
        }
    };

    const copyJsonToClipboard = () => {
        if (jsonData) {
            navigator.clipboard.writeText(JSON.stringify(jsonData, null, 2))
                .then(() => alert("JSON copied to clipboard!"))
                .catch(() => alert("Failed to copy JSON."));
        }
    };

    return (
        <div className='flex w-[100%] mt-[5%]'>
            <div className='w-[50%] p-2 flex border-2 flex-col'>
                <h1 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 my-2">
                    Use AI <AutoAwesomeIcon style={{ color: '#8b5cf6' }} />
                </h1>

                <div className='my-2 p-2'>
                    <input
                        type="text"
                        value={inputField}
                        onChange={handleInputChange}
                        placeholder="Enter field (e.g., name)"
                        className='rounded bg-black text-blue-200 p-2 mr-2'
                    />
                    <button className='rounded p-2 bg-gray-400 hover:bg-green-600 hover:text-white font-bold' onClick={addField}>Add Field</button>
                </div>

                <div>
                    <ul className='flex flex-wrap my-2'>
                        {fields.map((field, index) => (
                            <li className='p-1 rounded-xl mx-2 text-gray-800 font-bold text-center bg-purple-200' key={index}>{field}</li>
                        ))}
                    </ul>
                </div>

                <button className='my-4 p-2 rounded mx-2 min-w-[50px] text-gray-800 font-bold text-center bg-blue-300 max-w-[300px]' onClick={fetchJsonData}>Generate JSON</button>
            </div>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {jsonData ? (
                <div className='w-[50%] px-2'>
                    <pre className='border-2 text-red-300 bg-black rounded-md p-2'
                         style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
                        {JSON.stringify(jsonData, null, 2)}
                    </pre>
                    <button
                        onClick={copyJsonToClipboard}
                        className='mt-2 p-2 rounded bg-green-500 text-white font-bold hover:bg-green-700'
                    >
                        Copy JSON
                    </button>
                </div>
            ) : (
                !error && <p>loading....</p>
            )}
        </div>
    );
};

export default Gemini;
