import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import ManageCars from './admin/ManageCars';
import ManageBookings from './admin/ManageBookings';
import ManageUsers from './admin/ManageUsers';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import BookIcon from '@mui/icons-material/Book';
import PeopleIcon from '@mui/icons-material/People';
import DashboardIcon from '@mui/icons-material/Dashboard';

const AdminDashboard = () => {
  const menuItems = [
    { path: '/admin/cars', label: 'Manage Cars', icon: <DirectionsCarIcon /> },
    { path: '/admin/bookings', label: 'Manage Bookings', icon: <BookIcon /> },
    { path: '/admin/users', label: 'Manage Users', icon: <PeopleIcon /> }
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        className="w-64 bg-white shadow-lg border-r border-gray-200"
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-2 text-primary-600">
            <DashboardIcon className="text-3xl" />
            <h2 className="text-2xl font-bold">Admin Panel</h2>
          </div>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'text-gray-700 hover:bg-primary-50 hover:text-primary-600'
                }`
              }
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <Routes>
            <Route path="/" element={<AdminHome />} />
            <Route path="/cars" element={<ManageCars />} />
            <Route path="/bookings" element={<ManageBookings />} />
            <Route path="/users" element={<ManageUsers />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

const AdminHome = () => {
  const stats = [
    { icon: <DirectionsCarIcon className="text-5xl" />, title: 'Manage Cars', desc: 'Add, edit, or remove vehicles from your fleet', color: 'bg-blue-100 text-blue-600' },
    { icon: <BookIcon className="text-5xl" />, title: 'Manage Bookings', desc: 'View and update booking statuses', color: 'bg-green-100 text-green-600' },
    { icon: <PeopleIcon className="text-5xl" />, title: 'Manage Users', desc: 'View users and manage roles', color: 'bg-purple-100 text-purple-600' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
      <p className="text-gray-600 mb-8">Welcome to the admin panel. Manage your car rental system efficiently.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -8 }}
            className="card p-8 text-center"
          >
            <div className={`inline-flex items-center justify-center w-20 h-20 ${stat.color} rounded-full mb-4`}>
              {stat.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{stat.title}</h3>
            <p className="text-gray-600">{stat.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default AdminDashboard;
