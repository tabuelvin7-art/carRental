import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BookOnlineIcon from '@mui/icons-material/BookOnline';

const CarDetail = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingData, setBookingData] = useState({
    startDate: '',
    endDate: '',
    pickupLocation: '',
    dropoffLocation: ''
  });

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await axios.get(`/api/cars/${id}`);
        setCar(response.data);
      } catch (error) {
        toast.error('Car not found');
        navigate('/cars');
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id, navigate]);

  const handleChange = (e) => {
    setBookingData({ ...bookingData, [e.target.name]: e.target.value });
  };

  const calculateTotal = () => {
    if (!bookingData.startDate || !bookingData.endDate) return 0;
    const start = new Date(bookingData.startDate);
    const end = new Date(bookingData.endDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return days > 0 ? days * car.pricePerDay : 0;
  };

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.info('Please login to book a car');
      navigate('/login');
      return;
    }

    try {
      await axios.post('/api/bookings', {
        carId: id,
        ...bookingData
      });
      toast.success('Booking created successfully!');
      navigate('/my-bookings');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Booking failed');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <svg className="animate-spin h-12 w-12 text-primary-600 mx-auto mb-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <p className="text-gray-600">Loading car details...</p>
        </div>
      </div>
    );
  }

  if (!car) return <div>Car not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Car Image */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="sticky top-24 h-fit"
        >
          <img
            src={car.image}
            alt={`${car.brand} ${car.model}`}
            className="w-full rounded-2xl shadow-2xl"
          />
        </motion.div>

        {/* Car Info */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div className="card p-8">
            <span className="inline-block px-4 py-2 bg-primary-100 text-primary-600 rounded-full text-sm font-semibold uppercase mb-4">
              {car.category}
            </span>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {car.brand} {car.model}
            </h1>
            <p className="text-gray-600 mb-6">Year: {car.year}</p>

            <div className="flex items-baseline gap-2 mb-8">
              <span className="text-5xl font-bold text-primary-600">${car.pricePerDay}</span>
              <span className="text-xl text-gray-500">/day</span>
            </div>

            {/* Specs */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <PeopleIcon className="text-primary-600 mb-2" />
                <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Seats</p>
                <p className="text-lg font-bold text-gray-900">{car.seats}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <SettingsIcon className="text-primary-600 mb-2" />
                <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Transmission</p>
                <p className="text-lg font-bold text-gray-900">{car.transmission}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <LocalGasStationIcon className="text-primary-600 mb-2" />
                <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Fuel Type</p>
                <p className="text-lg font-bold text-gray-900">{car.fuelType}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <DirectionsCarIcon className="text-primary-600 mb-2" />
                <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Status</p>
                <p className="text-lg font-bold text-gray-900">
                  {car.available ? '✅ Available' : '❌ Not Available'}
                </p>
              </div>
            </div>

            {/* Features */}
            {car.features && car.features.length > 0 && (
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Features</h3>
                <div className="grid grid-cols-1 gap-2">
                  {car.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center gap-3 p-3 bg-green-50 rounded-lg"
                    >
                      <CheckCircleIcon className="text-green-600" fontSize="small" />
                      <span className="text-gray-700">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Booking Form */}
          {car.available && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="card p-8 border-2 border-primary-200"
            >
              <div className="flex items-center gap-2 mb-6">
                <BookOnlineIcon className="text-primary-600 text-3xl" />
                <h2 className="text-2xl font-bold text-gray-900">Book This Car</h2>
              </div>

              <form onSubmit={handleBooking} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <CalendarTodayIcon fontSize="small" className="mr-1" />
                      Start Date
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      value={bookingData.startDate}
                      onChange={handleChange}
                      min={new Date().toISOString().split('T')[0]}
                      required
                      className="input-field"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <CalendarTodayIcon fontSize="small" className="mr-1" />
                      End Date
                    </label>
                    <input
                      type="date"
                      name="endDate"
                      value={bookingData.endDate}
                      onChange={handleChange}
                      min={bookingData.startDate}
                      required
                      className="input-field"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <LocationOnIcon fontSize="small" className="mr-1" />
                    Pickup Location
                  </label>
                  <input
                    type="text"
                    name="pickupLocation"
                    placeholder="Enter pickup location"
                    value={bookingData.pickupLocation}
                    onChange={handleChange}
                    required
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <LocationOnIcon fontSize="small" className="mr-1" />
                    Dropoff Location
                  </label>
                  <input
                    type="text"
                    name="dropoffLocation"
                    placeholder="Enter dropoff location"
                    value={bookingData.dropoffLocation}
                    onChange={handleChange}
                    required
                    className="input-field"
                  />
                </div>

                {calculateTotal() > 0 && (
                  <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    className="p-6 bg-primary-50 rounded-xl text-center border-2 border-primary-200"
                  >
                    <p className="text-sm text-gray-600 mb-2">Total Price</p>
                    <p className="text-4xl font-bold text-primary-600">${calculateTotal()}</p>
                  </motion.div>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full btn btn-secondary py-4 text-lg"
                >
                  <BookOnlineIcon />
                  Book Now
                </motion.button>
              </form>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default CarDetail;
