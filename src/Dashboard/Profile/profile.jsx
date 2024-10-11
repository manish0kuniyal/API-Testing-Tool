import React,{useState} from 'react'
import { UpdateUser } from '../../api/userauth';
import { ToastContainer } from 'react-toastify';
function Profile() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

const handleUpdate=async(e)=>{
e.preventDefault()
setLoading(true);
try{
    const updateinfo=await UpdateUser({username,password});
    if(updateinfo){
        toast.success('Profile Updated successful! 🎉', { position: 'top-right', autoClose: 2000 });
    }else {
        toast.error('error updating ❌', { position: 'top-right', autoClose: 3000 });
      }
}
catch(error){
    toast.error(`Error: ${error.message}`, { position: 'top-right', autoClose: 3000 });
}finally{
    setLoading(false)
  }

}
  return (
    <>
    <div className="flex justify-center bg-gray-100 p-4">
    <ToastContainer />
      <div className="bg-white p-6 pt-4 rounded-xl shadow-xl w-full max-w-md">
        <h1 className="font-bold text-xl text-purple-700 mb-4 text-center">Update Info</h1>
        <form className="flex flex-col space-y-10" 
        onSubmit={handleUpdate}
        >
          <input
            type="text"
            placeholder="Username"
            className="p-2 border border-gray-300 rounded w-full"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="p-2 border border-gray-300 rounded w-full"
            value={password}
            onChange={(e) => setPasswords(e.target.value)}
            required
          />
          <button
            type="submit"
            className="p-2 rounded font-bold text-white bg-gray-400 hover:bg-purple-300 w-full"
          >
            {loading ? '.....' : 'Update info'}
          </button>
        </form>
      </div>
    </div>

    </>
  )
}

export default Profile