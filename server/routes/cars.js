const express = require('express');
const Car = require('../models/Car');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

// Get all cars
router.get('/', async (req, res) => {
  try {
    const { category, minPrice, maxPrice, available } = req.query;
    let query = {};

    if (category) query.category = category;
    if (available) query.available = available === 'true';
    if (minPrice || maxPrice) {
      query.pricePerDay = {};
      if (minPrice) query.pricePerDay.$gte = Number(minPrice);
      if (maxPrice) query.pricePerDay.$lte = Number(maxPrice);
    }

    const cars = await Car.find(query).sort({ createdAt: -1 });
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single car
router.get('/:id', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.json(car);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create car (admin only)
router.post('/', adminAuth, async (req, res) => {
  try {
    const car = new Car(req.body);
    await car.save();
    res.status(201).json(car);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update car (admin only)
router.put('/:id', adminAuth, async (req, res) => {
  try {
    const car = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.json(car);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete car (admin only)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.json({ message: 'Car deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
