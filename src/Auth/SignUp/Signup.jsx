import React from 'react';

function Signup() {
  return (
    <div className="flex justify-center   bg-gray-100 p-4">
      <div className="bg-white p-6 pt-4 rounded-xl shadow-xl w-full max-w-md">
        <h1 className="font-bold text-xl text-purple-700 mb-4 text-center">Signup</h1>
        <div className="flex flex-col space-y-10">
          <input
            type="text"
            placeholder="Email"
            className="p-2 border border-gray-300 rounded w-full"
          />  <input
          type="text"
          placeholder="Username"
          className="p-2 border border-gray-300 rounded w-full"
        />
          <input
            type="password"
            placeholder="Password"
            className="p-2 border border-gray-300 rounded w-full"
          />
          <button
            className="p-2 rounded font-bold text-white bg-gray-400 hover:bg-purple-300 hover:text-white w-full"
          >
            Signup
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
