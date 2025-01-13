// Home.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCalendar, FiHeart, FiEdit, FiBook, FiUsers } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.png';

const Home = () => {
    const [darkMode] = useState(false);

    const features = [
        {
            title: 'Cycle Tracking & Reminders',
            description: 'Log menstrual cycle details, predict future periods, fertile windows, and set reminders.',
            path: '/cycle-tracking',
            icon: FiCalendar,
        },
        {
            title: 'Health & Mood Insights',
            description: 'Display personalized health dashboard, visualize mood patterns, and provide insights.',
            path: '/health-insights',
            icon: FiHeart,
        },
        {
            title: 'Symptom & Wellness Tracking',
            description: 'Track physical and emotional symptoms, integrate stress, sleep, nutrition, and exercise tracking.',
            path: '/symptom-tracking',
            icon: FiEdit,
        },
        {
            title: 'Educational Resources',
            description: 'Offer hormonal health education, provide informative articles and videos.',
            path: '/educational-resources',
            icon: FiBook,
        },
        {
            title: 'AI Health Assistant',
            description: 'Get instant answers to your health-related questions from our AI assistant.',
            path: '/community-support',
            icon: FiUsers,
        },
        {
            title: 'Personal Journal',
            description: 'Maintain a diary for emotions and thoughts.',
            path: '/personal-journal',
            icon: FiEdit,
        },
    ];

    const darkModeStyle = 'bg-gradient-to-br from-purple-900 to-pink-700 text-white';
    const lightModeStyle = 'bg-gradient-to-r from-teal-400 via-pink-300 to-yellow-200 text-gray-800';

    return (
        <div className='p-10 bg-gradient-to-br from-blue-100 to-purple-100 min-h-screen py-10'>
            <div className='rounded-3xl overflow-hidden'>
                <div className={`${darkMode ? darkModeStyle : lightModeStyle} p-8 shadow-xl`}>
                    <div className="max-w-6xl mx-auto">
                        <div className="flex flex-col items-center mb-8">
                            <motion.h1
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-4xl font-extrabold mb-6"
                            >
                                Welcome to <span className="text-purple-600">HerCircle</span>!
                            </motion.h1>
                            <motion.div>
                                <img src={Logo} alt='logo' className='w-56 md:w-72' />
                            </motion.div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <Link to={feature.path}>
                                        <div className="bg-white rounded-xl shadow-lg p-8 h-full hover:shadow-2xl transition-all border-2 border-pink-200 hover:border-teal-300">
                                            <div className="flex items-center mb-4">
                                                <feature.icon size={28} className="mr-3 text-purple-500" />
                                                <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
                                            </div>
                                            <p className="text-gray-700">{feature.description}</p>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
