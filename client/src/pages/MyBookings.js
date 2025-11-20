import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-toastify';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CancelIcon from '@mui/icons-material/Cancel';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get('/api/bookings/my-bookings');
      setBookings(response.data);
    } catch (error) {
      toast.error('Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;

    try {
      await axios.patch(`/api/bookings/${bookingId}/cancel`);
      toast.success('Booking cancelled');
      fetchBookings();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to cancel booking');
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
      completed: 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <svg className="animate-spin h-12 w-12 text-primary-600 mx-auto mb-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <p className="text-gray-600">Loading bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-2">My Bookings</h1>
        <p className="text-gray-600">View and manage your car rental bookings</p>
      </motion.div>

      {bookings.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="card p-12 text-center"
        >
          <DirectionsCarIcon className="text-gray-300 text-6xl mb-4" />
          <p className="text-xl text-gray-600 mb-2">No bookings yet</p>
          <p className="text-gray-500">Start by browsing our available cars</p>
        </motion.div>
      ) : (
        <div className="space-y-6">
          {bookings.map((booking, index) => (
            <motion.div
              key={booking._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card overflow-hidden"
            >
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3">
                  <img
                    src={booking.car.image}
                    alt={`${booking.car.brand} ${booking.car.model}`}
                    className="w-full h-48 md:h-full object-cover"
                  />
                </div>

                <div className="p-4 sm:p-6 md:w-2/3">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
                        {booking.car.brand} {booking.car.model}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600">{booking.car.category}</p>
                    </div>
                    <span className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold uppercase ${getStatusColor(booking.status)} whitespace-nowrap self-start`}>
                      {booking.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div className="flex items-start gap-2 sm:gap-3 p-2.5 sm:p-3 bg-gray-50 rounded-lg">
                      <CalendarTodayIcon className="text-primary-600 mt-0.5" fontSize="small" />
                      <div>
                        <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Rental Period</p>
                        <p className="text-xs sm:text-sm font-medium text-gray-900">
                          {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 sm:gap-3 p-2.5 sm:p-3 bg-gray-50 rounded-lg">
                      <AttachMoneyIcon className="text-green-600 mt-0.5" fontSize="small" />
                      <div>
                        <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Total Price</p>
                        <p className="text-xs sm:text-sm font-medium text-gray-900">${booking.totalPrice}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 sm:gap-3 p-2.5 sm:p-3 bg-gray-50 rounded-lg">
                      <LocationOnIcon className="text-blue-600 mt-0.5" fontSize="small" />
                      <div>
                        <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Pickup</p>
                        <p className="text-xs sm:text-sm font-medium text-gray-900 break-words">{booking.pickupLocation}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 sm:gap-3 p-2.5 sm:p-3 bg-gray-50 rounded-lg">
                      <LocationOnIcon className="text-red-600 mt-0.5" fontSize="small" />
                      <div>
                        <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Dropoff</p>
                        <p className="text-xs sm:text-sm font-medium text-gray-900 break-words">{booking.dropoffLocation}</p>
                      </div>
                    </div>
                  </div>

                  {booking.status === 'pending' && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleCancel(booking._id)}
                      className="btn btn-danger text-sm sm:text-base w-full sm:w-auto"
                    >
                      <CancelIcon fontSize="small" />
                      Cancel Booking
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
