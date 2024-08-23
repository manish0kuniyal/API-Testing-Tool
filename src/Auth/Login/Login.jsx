import React from 'react';

function Login({ onSwitchToSignup }) {
  return (
    <div className="flex justify-center  bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
        <h1 className="font-bold text-xl text-purple-700 mb-6 text-center">Login</h1>
        <div className="flex flex-col space-y-10">
          <input
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
            Login
          </button>
          
        </div>
        <h1 className="mt-8 flex text-gray-400">
          <p>Don't have an account?</p>
          <p
            className="ml-2 mr-1 text-purple-500 underline cursor-pointer"
            onClick={onSwitchToSignup}
          >
            Create one 
          </p>
          /
          <p
            className="ml-1 underline text-blue-400 cursor-pointer"
            // onClick={onSwitchToSignup}
          >Try for free
          </p>
        </h1>
      </div>
    </div>
  );
}

export default Login;
