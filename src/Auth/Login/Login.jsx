import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginuser } from '../../api/userauth';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await loginuser({ username, password });
      console.log(result); // Debugging line

      if (result && result.token) {
        localStorage.setItem('authToken', result.token);
        toast.success('Login successful! 🎉', { position: 'top-right', autoClose: 3000 });
        
        window.location.href='/'
        // navigate('/'); 
      } else {
        toast.error('Wrong Credentials ❌', { position: 'top-right', autoClose: 3000 });
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
        <h1 className="font-bold text-xl text-purple-700 mb-4 text-center">Login</h1>
        <form className="flex flex-col space-y-10" onSubmit={handleLogin}>
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
            className="p-2 rounded font-bold text-white bg-gray-400 hover:bg-purple-300 w-full"
          >
            {loading ? '.....' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
