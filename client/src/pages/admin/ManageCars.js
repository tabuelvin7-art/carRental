import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-toastify';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';

const ManageCars = () => {
  const [cars, setCars] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingCar, setEditingCar] = useState(null);
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    category: 'Economy',
    pricePerDay: '',
    seats: 5,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    image: '',
    available: true,
    features: ''
  });

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const response = await axios.get('/api/cars');
      setCars(response.data);
    } catch (error) {
      toast.error('Failed to fetch cars');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ...formData,
        features: formData.features.split(',').map(f => f.trim()).filter(f => f)
      };

      if (editingCar) {
        await axios.put(`/api/cars/${editingCar._id}`, data);
        toast.success('Car updated successfully');
      } else {
        await axios.post('/api/cars', data);
        toast.success('Car added successfully');
      }

      resetForm();
      fetchCars();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    }
  };

  const handleEdit = (car) => {
    setEditingCar(car);
    setFormData({
      ...car,
      features: car.features.join(', ')
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this car?')) return;

    try {
      await axios.delete(`/api/cars/${id}`);
      toast.success('Car deleted');
      fetchCars();
    } catch (error) {
      toast.error('Failed to delete car');
    }
  };

  const resetForm = () => {
    setFormData({
      brand: '',
      model: '',
      year: new Date().getFullYear(),
      category: 'Economy',
      pricePerDay: '',
      seats: 5,
      transmission: 'Automatic',
      fuelType: 'Petrol',
      image: '',
      available: true,
      features: ''
    });
    setEditingCar(null);
    setShowForm(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Cars</h1>
          <p className="text-gray-600 mt-1">Add, edit, or remove vehicles from your fleet</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowForm(!showForm)}
          className="btn btn-primary"
        >
          {showForm ? <CloseIcon fontSize="small" /> : <AddIcon fontSize="small" />}
          {showForm ? 'Cancel' : 'Add New Car'}
        </motion.button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="card p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {editingCar ? 'Edit Car' : 'Add New Car'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
                  <input name="brand" value={formData.brand} onChange={handleChange} required className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Model</label>
                  <input name="model" value={formData.model} onChange={handleChange} required className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                  <input type="number" name="year" value={formData.year} onChange={handleChange} required className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select name="category" value={formData.category} onChange={handleChange} className="input-field">
                    <option value="Economy">Economy</option>
                    <option value="Compact">Compact</option>
                    <option value="SUV">SUV</option>
                    <option value="Luxury">Luxury</option>
                    <option value="Van">Van</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price Per Day ($)</label>
                  <input type="number" name="pricePerDay" value={formData.pricePerDay} onChange={handleChange} required className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Seats</label>
                  <input type="number" name="seats" value={formData.seats} onChange={handleChange} required className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Transmission</label>
                  <select name="transmission" value={formData.transmission} onChange={handleChange} className="input-field">
                    <option value="Automatic">Automatic</option>
                    <option value="Manual">Manual</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Fuel Type</label>
                  <select name="fuelType" value={formData.fuelType} onChange={handleChange} className="input-field">
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Electric">Electric</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                  <input name="image" value={formData.image} onChange={handleChange} className="input-field" placeholder="https://example.com/car-image.jpg" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Features (comma separated)</label>
                  <input name="features" value={formData.features} onChange={handleChange} className="input-field" placeholder="Air Conditioning, GPS, Bluetooth" />
                </div>
                <div className="md:col-span-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" name="available" checked={formData.available} onChange={handleChange} className="w-5 h-5 text-primary-600 rounded focus:ring-2 focus:ring-primary-500" />
                    <span className="text-sm font-medium text-gray-700">Available for Rent</span>
                  </label>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="btn btn-secondary mt-6"
              >
                <SaveIcon fontSize="small" />
                {editingCar ? 'Update Car' : 'Add Car'}
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cars.map((car, index) => (
          <motion.div
            key={car._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="card overflow-hidden"
          >
            <div className="md:flex">
              <img src={car.image} alt={`${car.brand} ${car.model}`} className="w-full md:w-48 h-48 object-cover" />
              <div className="p-6 flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{car.brand} {car.model}</h3>
                <div className="space-y-2 mb-4">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Category:</span> {car.category}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Price:</span> ${car.pricePerDay}/day
                  </p>
                  <p className="text-sm">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${car.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {car.available ? '✅ Available' : '❌ Not Available'}
                    </span>
                  </p>
                </div>
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleEdit(car)}
                    className="btn btn-outline flex-1"
                  >
                    <EditIcon fontSize="small" />
                    Edit
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDelete(car._id)}
                    className="btn btn-danger flex-1"
                  >
                    <DeleteIcon fontSize="small" />
                    Delete
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ManageCars;
