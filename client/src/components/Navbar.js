import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import HomeIcon from '@mui/icons-material/Home';
import BookIcon from '@mui/icons-material/Book';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-white shadow-md sticky top-0 z-50 border-b border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-primary-600 hover:text-primary-700 transition-colors">
            <DirectionsCarIcon className="text-3xl" />
            <span>CarRental</span>
          </Link>

          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-1 px-4 py-2 text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all">
              <HomeIcon fontSize="small" />
              <span className="hidden sm:inline">Home</span>
            </Link>

            <Link to="/cars" className="flex items-center gap-1 px-4 py-2 text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all">
              <DirectionsCarIcon fontSize="small" />
              <span className="hidden sm:inline">Browse Cars</span>
            </Link>

            {user ? (
              <>
                <Link to="/my-bookings" className="flex items-center gap-1 px-4 py-2 text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all">
                  <BookIcon fontSize="small" />
                  <span className="hidden sm:inline">My Bookings</span>
                </Link>

                <Link to="/profile" className="flex items-center gap-1 px-4 py-2 text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all">
                  <PersonIcon fontSize="small" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                {user.role === 'admin' && (
                  <Link to="/admin" className="flex items-center gap-1 px-4 py-2 text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all">
                    <DashboardIcon fontSize="small" />
                    <span className="hidden sm:inline">Dashboard</span>
                  </Link>
                )}

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 px-4 py-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                >
                  <LogoutIcon fontSize="small" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="flex items-center gap-1 px-4 py-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-all font-medium">
                  <LoginIcon fontSize="small" />
                  <span>Login</span>
                </Link>
                <Link to="/register" className="btn btn-primary">
                  <PersonAddIcon fontSize="small" />
                  <span>Sign Up</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
