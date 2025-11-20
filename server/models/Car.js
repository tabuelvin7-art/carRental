const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    enum: ['Economy', 'Compact', 'SUV', 'Luxury', 'Van'],
    required: true
  },
  pricePerDay: {
    type: Number,
    required: true
  },
  seats: {
    type: Number,
    required: true
  },
  transmission: {
    type: String,
    enum: ['Automatic', 'Manual'],
    required: true
  },
  fuelType: {
    type: String,
    enum: ['Petrol', 'Diesel', 'Electric', 'Hybrid'],
    required: true
  },
  image: {
    type: String,
    default: 'https://via.placeholder.com/400x300?text=Car+Image'
  },
  available: {
    type: Boolean,
    default: true
  },
  features: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Car', carSchema);
