import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Sidebar from './Components/Sidebar/Sidebar';
import ApiUrl from './Dashboard/ApiUrl/ApiUrl';
import History from './Dashboard/ApiHistory/History';
import Home from './Dashboard/Home/Home';
import Auth from './Auth/Auth';
import Profile from './Dashboard/Profile/profile';
import CloseIcon from '@mui/icons-material/Close';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import LoadTest from './Dashboard/Load/Load';
import Cookies from "js-cookie";

const NotFound = () => {
  return <div className="text-center text-2xl">Page Not Found</div>;
};

const ProtectedRoute = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }
  return children;
};

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();  
    };

    const token = getCookie('access_token');
    console.log("Token found in cookies:", token);  

    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }

    setLoading(false); 
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const isDashboardRoute = ["/", "/apiurl", "/history", "/profile", "/loadapi"].includes(location.pathname);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen flex flex-col">
      {isDashboardRoute && (
        <header className="fixed top-0 left-0 w-full bg-bkShade text-wtShade z-20 md:hidden flex justify-between items-center px-4">
          <button
            className="p-3 bg-bkShade text-wtShade rounded-full shadow-lg"
            onClick={toggleSidebar}
          >
            {isSidebarOpen ? (
              <CloseIcon />
            ) : (
              <DragHandleIcon />
            )}
          </button>
          <div className="text-md font-bold">Dashboard</div>
        </header>
      )}

      <div className={`flex flex-1 ${isDashboardRoute ? '' : ''}`}>
        {isDashboardRoute && <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />}

        <main className={`flex-1 pt-4 mt-10 sm:mt-10 md:mt-0 lg:mt-0 bg-wtSmoke ${isDashboardRoute ? '' : ''}`}>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route
              path="/"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/ApiUrl"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <ApiUrl />
                </ProtectedRoute>
              }
            />
            <Route
              path="/History"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <History />
                </ProtectedRoute>
              }
            /><Route
            path="/loadapi"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <LoadTest />
              </ProtectedRoute>
            }
          />
            <Route
              path="/profile"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
