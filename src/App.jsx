import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Sidebar from './Components/Sidebar/Sidebar';
import Contacts from './Dashboard/Contacts/Contacts';
import Alerts from './Dashboard/Alerts/Alerts';
import Home from './Dashboard/Home/Home';
import Auth from './Auth/Auth';
import Profile from './Dashboard/Profile/profile';
import CloseIcon from '@mui/icons-material/Close';
import DragHandleIcon from '@mui/icons-material/DragHandle';

// NotFound component for undefined routes
const NotFound = () => {
  return <div className="text-center text-2xl">Page Not Found</div>;
};

// ProtectedRoute component to guard dashboard routes
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
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    // Check local storage or other mechanism for token or auth status
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    };
    
    // Example usage:
    const token = getCookie('access_token');
    // console.log("...",token); // Will log the value of the authToken cookie or undefined if it doesn't exist
    
    if (token) {
      setIsAuthenticated(true); // Set auth status to true if token exists
    }
    setLoading(false); // Set loading to false after checking
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const isDashboardRoute = ["/", "/contacts", "/alerts","/profile"].includes(location.pathname);

  // While loading, return nothing (or you can display a loading spinner)
  if (loading) {
    return <div>Loading...</div>; // Optional: You can replace this with a proper loading spinner
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Conditionally render header and sidebar based on the route */}
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

        <main className={`flex-1  pt-4 mt-10 sm:mt-10 md:mt-0 lg:mt-0  bg-wtSmoke ${isDashboardRoute ? '' : ''}`}>
          <Routes>
            {/* Auth Route */}
            <Route path="/auth" element={<Auth />} />

            {/* Protected Dashboard Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/contacts"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Contacts />
                </ProtectedRoute>
              }
            />
            <Route
              path="/alerts"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Alerts />
                </ProtectedRoute>
              }
            /><Route
            path="/profile"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Profile />
              </ProtectedRoute>
            }
          />

            {/* Catch-all Route for undefined paths */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
