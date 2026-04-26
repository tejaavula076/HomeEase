const Booking = require("../models/Booking");

const createBooking = async (req, res) => {
  try {
    const { services, totalAmount, bookingDate, bookingTime, address } = req.body;

    const booking = await Booking.create({
      user: req.user._id,
      services,
      totalAmount,
      bookingDate,
      bookingTime,
      address
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createBooking,
  getMyBookings
};