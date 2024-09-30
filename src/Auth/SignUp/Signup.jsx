import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createUser } from '../../api/userauth';

function Signup({onSignupSuccess}) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await createUser({ email, username, password });
      if (result) {
        toast.success('Signup successful! 🎉', { position: 'top-right', autoClose: 3000 });
        setTimeout(() => {
          onSignupSuccess(); 
        }, 3000);} else {
        toast.error('Email already exists ❌', { position: 'top-right', autoClose: 3000 });
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`, { position: 'top-right', autoClose: 3000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center bg-gray-100 p-4">
      <ToastContainer />
      <div className="bg-white p-6 pt-4 rounded-xl shadow-xl w-full max-w-md">
        <h1 className="font-bold text-xl text-purple-700 mb-4 text-center">Signup</h1>
        <form className="flex flex-col space-y-10" onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Email"
            className="p-2 border border-gray-300 rounded w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Username"
            className="p-2 border border-gray-300 rounded w-full"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="p-2 border border-gray-300 rounded w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="p-2 rounded font-bold text-white bg-gray-400 hover:bg-purple-300 hover:text-white w-full"
          >
            {loading ? '.....' : 'Signup'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
