import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import FilterListIcon from '@mui/icons-material/FilterList';

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
    available: true
  });

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const params = new URLSearchParams();
        if (filters.category) params.append('category', filters.category);
        if (filters.minPrice) params.append('minPrice', filters.minPrice);
        if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
        params.append('available', filters.available);

        const response = await axios.get(`/api/cars?${params}`);
        setCars(response.data);
      } catch (error) {
        console.error('Error fetching cars:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters({
      ...filters,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <svg className="animate-spin h-12 w-12 text-primary-600 mx-auto mb-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <p className="text-gray-600">Loading cars...</p>
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
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Available Cars</h1>
        <p className="text-gray-600">Find the perfect vehicle for your journey</p>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card p-6 mb-8"
      >
        <div className="flex items-center gap-2 mb-4">
          <FilterListIcon className="text-primary-600" />
          <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <select
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            className="input-field"
          >
            <option value="">All Categories</option>
            <option value="Economy">Economy</option>
            <option value="Compact">Compact</option>
            <option value="SUV">SUV</option>
            <option value="Luxury">Luxury</option>
            <option value="Sport">Sport</option>
            <option value="Van">Van</option>
          </select>

          <input
            type="number"
            name="minPrice"
            placeholder="Min Price"
            value={filters.minPrice}
            onChange={handleFilterChange}
            className="input-field"
          />

          <input
            type="number"
            name="maxPrice"
            placeholder="Max Price"
            value={filters.maxPrice}
            onChange={handleFilterChange}
            className="input-field"
          />

          <label className="flex items-center gap-2 px-4 py-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
            <input
              type="checkbox"
              name="available"
              checked={filters.available}
              onChange={handleFilterChange}
              className="w-5 h-5 text-primary-600 rounded focus:ring-2 focus:ring-primary-500"
            />
            <span className="text-sm font-medium text-gray-700">Available Only</span>
          </label>
        </div>
      </motion.div>

      {/* Cars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car, index) => (
          <motion.div
            key={car._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -8 }}
            className="card overflow-hidden group"
          >
            <div className="relative overflow-hidden">
              <img
                src={car.image}
                alt={`${car.brand} ${car.model}`}
                className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 bg-primary-600 text-white text-xs font-semibold rounded-full uppercase tracking-wide">
                  {car.category}
                </span>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {car.brand} {car.model}
              </h3>

              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-3xl font-bold text-primary-600">${car.pricePerDay}</span>
                <span className="text-gray-500">/day</span>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-6 p-3 bg-gray-50 rounded-lg">
                <div className="flex flex-col items-center">
                  <PeopleIcon className="text-gray-600 mb-1" fontSize="small" />
                  <span className="text-xs text-gray-600">{car.seats} Seats</span>
                </div>
                <div className="flex flex-col items-center">
                  <SettingsIcon className="text-gray-600 mb-1" fontSize="small" />
                  <span className="text-xs text-gray-600">{car.transmission}</span>
                </div>
                <div className="flex flex-col items-center">
                  <LocalGasStationIcon className="text-gray-600 mb-1" fontSize="small" />
                  <span className="text-xs text-gray-600">{car.fuelType}</span>
                </div>
              </div>

              <Link to={`/cars/${car._id}`} className="btn btn-primary w-full">
                <DirectionsCarIcon fontSize="small" />
                View Details
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      {cars.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <DirectionsCarIcon className="text-gray-300 text-6xl mb-4" />
          <p className="text-xl text-gray-600">No cars found matching your criteria</p>
        </motion.div>
      )}
    </div>
  );
};

export default Cars;
