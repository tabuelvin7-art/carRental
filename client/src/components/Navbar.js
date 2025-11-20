import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import HomeIcon from '@mui/icons-material/Home';
import BookIcon from '@mui/icons-material/Book';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-white shadow-md sticky top-0 z-50 border-b border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2 text-xl sm:text-2xl font-bold text-primary-600 hover:text-primary-700 transition-colors" onClick={closeMobileMenu}>
            <DirectionsCarIcon className="text-2xl sm:text-3xl" />
            <span className="hidden xs:inline">CarRental</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-1">
            <Link to="/" className="flex items-center gap-1 px-3 xl:px-4 py-2 text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all">
              <HomeIcon fontSize="small" />
              <span>Home</span>
            </Link>

            <Link to="/cars" className="flex items-center gap-1 px-3 xl:px-4 py-2 text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all">
              <DirectionsCarIcon fontSize="small" />
              <span>Browse Cars</span>
            </Link>

            {user ? (
              <>
                <Link to="/my-bookings" className="flex items-center gap-1 px-3 xl:px-4 py-2 text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all">
                  <BookIcon fontSize="small" />
                  <span>My Bookings</span>
                </Link>

                <Link to="/profile" className="flex items-center gap-1 px-3 xl:px-4 py-2 text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all">
                  <PersonIcon fontSize="small" />
                  <span>Profile</span>
                </Link>

                {user.role === 'admin' && (
                  <Link to="/admin" className="flex items-center gap-1 px-3 xl:px-4 py-2 text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all">
                    <DashboardIcon fontSize="small" />
                    <span>Dashboard</span>
                  </Link>
                )}

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 px-3 xl:px-4 py-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                >
                  <LogoutIcon fontSize="small" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="flex items-center gap-1 px-3 xl:px-4 py-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-all font-medium">
                  <LoginIcon fontSize="small" />
                  <span>Login</span>
                </Link>
                <Link to="/register" className="btn btn-primary text-sm xl:text-base">
                  <PersonAddIcon fontSize="small" />
                  <span>Sign Up</span>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden border-t border-gray-200 bg-white"
          >
            <div className="px-4 py-4 space-y-2 max-h-[calc(100vh-4rem)] overflow-y-auto">
              <Link to="/" onClick={closeMobileMenu} className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all">
                <HomeIcon />
                <span className="font-medium">Home</span>
              </Link>

              <Link to="/cars" onClick={closeMobileMenu} className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all">
                <DirectionsCarIcon />
                <span className="font-medium">Browse Cars</span>
              </Link>

              {user ? (
                <>
                  <Link to="/my-bookings" onClick={closeMobileMenu} className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all">
                    <BookIcon />
                    <span className="font-medium">My Bookings</span>
                  </Link>

                  <Link to="/profile" onClick={closeMobileMenu} className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all">
                    <PersonIcon />
                    <span className="font-medium">Profile</span>
                  </Link>

                  {user.role === 'admin' && (
                    <Link to="/admin" onClick={closeMobileMenu} className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all">
                      <DashboardIcon />
                      <span className="font-medium">Admin Dashboard</span>
                    </Link>
                  )}

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                  >
                    <LogoutIcon />
                    <span className="font-medium">Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={closeMobileMenu} className="flex items-center gap-3 px-4 py-3 text-primary-600 hover:bg-primary-50 rounded-lg transition-all font-medium">
                    <LoginIcon />
                    <span>Login</span>
                  </Link>
                  <Link to="/register" onClick={closeMobileMenu} className="flex items-center gap-3 px-4 py-3 bg-primary-600 text-white hover:bg-primary-700 rounded-lg transition-all font-medium">
                    <PersonAddIcon />
                    <span>Sign Up</span>
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
