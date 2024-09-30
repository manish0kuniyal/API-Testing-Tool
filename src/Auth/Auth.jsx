import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Signup from './SignUp/Signup';
import Login from './Login/Login';

const Auth = () => {
  const [selected, setSelected] = useState('login'); // Initial selection is 'login'


  const formVariants = {
    hidden: { opacity: 0, y: 20 }, 
    visible: { opacity: 1, y: 0 }, 
    exit: { opacity: 0, y: -20 }  
  };

  const handleSwitch = (type) => {
    setSelected(type);
  };

  return (
    <div className="lg:px-[15%] md:px-[10%] lg:mt-[5%] mt-[15%] mx-auto">
      <div className="flex justify-center bg-purple-100 p-1 rounded-lg w-[50%] lg:w-[30%] mx-auto mb-4 font-bold px-2">
        <button
          onClick={() => handleSwitch('login')}
          className={`px-4 w-[50%] py-2 rounded ${
            selected === 'login' ? 'bg-purple-300 text-white' : 'text-black'
          }`}
        >
          Login
        </button>
        <button
          onClick={() => handleSwitch('signup')}
          className={`px-4 w-[50%] ml-2 py-2 rounded ${
            selected === 'signup' ? 'bg-purple-300 text-white' : 'text-black'
          }`}
        >
          Signup
        </button>
      </div>

      <div>
        {/* Add Framer Motion for smooth transitions */}
        {selected === 'signup' ? (
          <motion.div
            key="signup"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={formVariants}
            transition={{ duration: 1 }} // Control speed of animation
          >
            <Signup onSignupSuccess={() => handleSwitch('login')} />
          </motion.div>
        ) : (
          <motion.div
            key="login"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={formVariants}
            transition={{ duration: 1 }} // Control speed of animation
          >
            <Login onSwitchToSignup={() => handleSwitch('signup')} />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Auth;
