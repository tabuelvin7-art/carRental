const express = require('express');
const Booking = require('../models/Booking');
const Car = require('../models/Car');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

// Get user bookings
router.get('/my-bookings', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate('car')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all bookings (admin only)
router.get('/', adminAuth, async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('user', 'name email phone')
      .populate('car')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create booking
router.post('/', auth, async (req, res) => {
  try {
    const { carId, startDate, endDate, pickupLocation, dropoffLocation } = req.body;

    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    if (!car.available) {
      return res.status(400).json({ message: 'Car is not available' });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    const totalPrice = days * car.pricePerDay;

    const booking = new Booking({
      user: req.user._id,
      car: carId,
      startDate,
      endDate,
      totalPrice,
      pickupLocation,
      dropoffLocation
    });

    await booking.save();
    await booking.populate('car');

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update booking status (admin only)
router.patch('/:id/status', adminAuth, async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('car user');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Cancel booking
router.patch('/:id/cancel', auth, async (req, res) => {
  try {
    const booking = await Booking.findOne({ _id: req.params.id, user: req.user._id });
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.status === 'completed' || booking.status === 'cancelled') {
      return res.status(400).json({ message: 'Cannot cancel this booking' });
    }

    booking.status = 'cancelled';
    await booking.save();

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
