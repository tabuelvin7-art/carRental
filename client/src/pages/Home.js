import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import SecurityIcon from '@mui/icons-material/Security';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Home = () => {
  const features = [
    {
      icon: <DirectionsCarIcon className="text-5xl" />,
      title: 'Premium Fleet',
      description: 'Choose from our extensive collection of well-maintained vehicles, from economy to luxury cars'
    },
    {
      icon: <AttachMoneyIcon className="text-5xl" />,
      title: 'Transparent Pricing',
      description: 'Competitive rates with no hidden fees. What you see is what you pay'
    },
    {
      icon: <SupportAgentIcon className="text-5xl" />,
      title: '24/7 Support',
      description: 'Round-the-clock customer service to assist you whenever you need help'
    },
    {
      icon: <SecurityIcon className="text-5xl" />,
      title: 'Secure Booking',
      description: 'Safe and secure online booking system with instant confirmation'
    },
    {
      icon: <LocationOnIcon className="text-5xl" />,
      title: 'Multiple Locations',
      description: 'Convenient pickup and drop-off locations across the city'
    },
    {
      icon: <CheckCircleIcon className="text-5xl" />,
      title: 'Flexible Terms',
      description: 'Easy cancellation policy and flexible rental periods to suit your needs'
    }
  ];

  const stats = [
    { value: '500+', label: 'Vehicles Available' },
    { value: '10K+', label: 'Happy Customers' },
    { value: '50+', label: 'Locations' },
    { value: '24/7', label: 'Customer Support' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white py-24 md:py-32 overflow-hidden"
      >
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
        }}></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
          >
            Premium Car Rental Experience
          </motion.h1>
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl mb-10 text-primary-100 max-w-3xl mx-auto"
          >
            Discover the perfect vehicle for your journey with our extensive fleet of quality cars
          </motion.p>
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Link
              to="/cars"
              className="inline-flex items-center gap-2 bg-white text-primary-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all shadow-xl"
            >
              <DirectionsCarIcon />
              Explore Our Fleet
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the difference with our premium car rental service
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="card p-8 text-center border border-gray-100"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-100 text-primary-600 rounded-full mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="text-center"
              >
                <div className="text-5xl font-bold mb-2">{stat.value}</div>
                <div className="text-primary-100 text-lg">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
