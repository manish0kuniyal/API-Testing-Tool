import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './Components/Sidebar/Sidebar';
import Habit from './Dashboard/Habit/habit';
import Alerts from './Dashboard/Alerts/Alerts';
import Home from './Dashboard/Home/Home';
import Login from './Auth/Login/Login'; // Import the hamburger menu icon
import CloseIcon from '@mui/icons-material/Close'; // Import the close icon
import DragHandleIcon from '@mui/icons-material/DragHandle';
function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header with hamburger button */}
      <header className="fixed top-0 left-0 w-full  bg-bkShade text-wtShade z-20 md:hidden flex justify-between items-center px-4">
        <button
          className="p-3 bg-bkShade text-wtShade rounded-full shadow-lg"
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? (
            <CloseIcon /> // Show close icon when sidebar is open
          ) : (
            <DragHandleIcon /> // Show hamburger menu icon when sidebar is closed
          )}
        </button>
        <div className="text-md font-bold">Dashboard</div>
      </header>

      <div className="flex flex-1  md:pt-0">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        <main className="flex-1 p-4 bg-wtSmoke">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/habits" element={<Habit />} />
            <Route path="/alerts" element={<Alerts />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
