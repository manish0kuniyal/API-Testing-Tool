import React, { useState } from 'react';
import Signup from './SignUp/Signup';
import Login from './Login/Login';

const Auth = () => {
  const [selected, setSelected] = useState('login'); // Initial selection is 'login'

  return (
    <div className="border-2 p-4">
      {/* Toggle Button Group */}
      <div className="flex justify-center bg-purple-100 p-1 rounded-lg w-[50%] mx-auto mb-4 font-bold">
        <button
          onClick={() => setSelected('login')}
          className={`px-4 w-[50%] py-2 rounded ${
            selected === 'login' ? 'bg-purple-300 text-white' : 'bg-grey-600 text-black'
          }`}
        >
          Login
        </button>
        <button
          onClick={() => setSelected('signup')}
          className={`px-4 w-[50%]  ml-2 py-2 rounded ${
            selected === 'signup' ? 'bg-purple-300 text-white' : 'bg-grey-600 text-black'
          }`}
        >
          Signup
        </button>
      </div>
      <div>
        {selected === 'signup' ? <Signup /> : <Login />}
      </div>
    </div>
  );
};

export default Auth;
