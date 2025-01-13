import React, { useState } from 'react';
import { FaBed, FaUtensils, FaRunning, FaHeartbeat } from 'react-icons/fa';
import { motion } from 'framer-motion';

const SymptomWellnessTracking = () => {
  const [selectedSymptom, setSelectedSymptom] = useState(null);
  const [trackingDetails, setTrackingDetails] = useState('');
  const [trackedSymptoms, setTrackedSymptoms] = useState([]); // Store all tracked symptoms

  const handleSymptomSelection = (symptom) => {
    setSelectedSymptom(symptom);
  };

  const handleTrackingDetailsChange = (event) => {
    setTrackingDetails(event.target.value);
  };

  const handleTrackingSubmission = () => {
    if (selectedSymptom && trackingDetails) {
      // Add new tracked symptom to the list
      const newEntry = { symptom: selectedSymptom, details: trackingDetails };
      setTrackedSymptoms([...trackedSymptoms, newEntry]);

      // Reset the input fields
      setSelectedSymptom(null);
      setTrackingDetails('');
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-500 to-purple-300 text-gray-900 min-h-screen p-10">
      <h2 className="text-3xl font-semibold mb-4">Symptom & Wellness Tracking</h2>
      <div className="grid grid-cols-2 gap-6">
        {/* Symptom Selection */}
        <div>
          <h3 className="text-2xl font-semibold">Track Physical Symptoms</h3>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <motion.div
              className={`text-center p-4 rounded-lg cursor-pointer ${
                selectedSymptom === 'pain' ? 'bg-red-500' : 'bg-gray-100 hover:bg-red-500'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleSymptomSelection('pain')}
            >
              <FaHeartbeat size={32} className="text-white" />
              <p className="mt-2">Pain</p>
            </motion.div>
            <motion.div
              className={`text-center p-4 rounded-lg cursor-pointer ${
                selectedSymptom === 'fatigue' ? 'bg-yellow-400' : 'bg-gray-100 hover:bg-yellow-400'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleSymptomSelection('fatigue')}
            >
              <FaBed size={32} className="text-white" />
              <p className="mt-2">Fatigue</p>
            </motion.div>
            <motion.div
              className={`text-center p-4 rounded-lg cursor-pointer ${
                selectedSymptom === 'appetite' ? 'bg-green-400' : 'bg-gray-100 hover:bg-green-400'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleSymptomSelection('appetite')}
            >
              <FaUtensils size={32} className="text-white" />
              <p className="mt-2">Appetite</p>
            </motion.div>
            <motion.div
              className={`text-center p-4 rounded-lg cursor-pointer ${
                selectedSymptom === 'activity' ? 'bg-blue-400' : 'bg-gray-100 hover:bg-blue-400'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleSymptomSelection('activity')}
            >
              <FaRunning size={32} className="text-white" />
              <p className="mt-2">Activity</p>
            </motion.div>
          </div>
        </div>

        {/* Tracking Details */}
        <div>
          <h3 className="text-2xl font-semibold">Emotional Wellness Tracking</h3>
          <p>Monitor your emotional well-being over time.</p>
          <hr className="my-4" />
          {selectedSymptom && (
            <div className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow">
              <p>Selected Symptom: {selectedSymptom}</p>
              <textarea
                value={trackingDetails}
                onChange={handleTrackingDetailsChange}
                className="w-full h-20 p-2 border rounded-lg focus:outline-none"
                placeholder="Enter tracking details..."
              />
              <button
                onClick={handleTrackingSubmission}
                className={`mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 focus:outline-none ${
                  trackingDetails ? '' : 'opacity-50 cursor-not-allowed'
                }`}
                disabled={!trackingDetails}
              >
                Track Symptom
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Display Tracked Symptoms */}
      <div className="mt-8 bg-white rounded-lg shadow p-6">
        <h3 className="text-2xl font-semibold mb-4">Tracked Symptoms</h3>
        {trackedSymptoms.length > 0 ? (
          <ul className="space-y-4">
            {trackedSymptoms.map((entry, index) => (
              <li
                key={index}
                className="p-4 bg-gray-100 rounded-lg shadow flex justify-between items-center"
              >
                <span>
                  <strong>Symptom:</strong> {entry.symptom} <br />
                  <strong>Details:</strong> {entry.details}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No symptoms tracked yet.</p>
        )}
      </div>
    </div>
  );
};

export default SymptomWellnessTracking;
