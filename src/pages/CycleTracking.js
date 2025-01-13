import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Confetti from 'react-dom-confetti';
import { FiCalendar, FiTool } from 'react-icons/fi';

const CycleTracking = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [futurePeriods, setFuturePeriods] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const handleLogCycle = () => {
    if (startDate && endDate) {
      const cycleLength = (endDate - startDate) / (1000 * 60 * 60 * 24);
      const futurePeriodDates = [];
      let currentDate = new Date(startDate);

      for (let i = 0; i < 3; i++) {
        const futureDate = new Date(currentDate.getTime() + 30 * 24 * 60 * 60 * 1000); // Adding 30 days
        futurePeriodDates.push(futureDate);
        currentDate = futureDate;
      }

      setFuturePeriods(futurePeriodDates);
      setShowConfetti(true);
    }
  };

  const handleSetReminder = (date) => {
    const reminderMessage = document.querySelector('#reminderMessage').value;
    setShowDialog(true);
  };

  return (
    <div className="bg-gradient-to-br from-purple-200 via-pink-100 to-yellow-200 text-gray-800 min-h-screen p-10">
      <h2 className="text-4xl font-bold mb-4 text-purple-700">Cycle Tracking & Reminders</h2>
      <div className="space-y-6">
        <div className="flex items-center">
          <label className="text-lg font-medium text-teal-600 mr-2">Start Date:</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="p-2 border border-teal-400 rounded-md focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div className="flex items-center">
          <label className="text-lg font-medium text-teal-600 mr-2">End Date:</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            className="p-2 border border-teal-400 rounded-md focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <button
          onClick={handleLogCycle}
          className="px-5 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg shadow-lg hover:from-blue-600 hover:to-indigo-600 focus:outline-none"
        >
          Log Cycle
        </button>
        <Confetti active={showConfetti} config={{ spread: 360 }} />
      </div>

      <h3 className="text-3xl font-bold mt-8 text-purple-700">Expected Future Periods:</h3>
      <ul className="list-disc pl-6 space-y-2">
        {futurePeriods.map((periodDate, index) => (
          <li key={index} className="text-lg text-pink-600">{periodDate.toDateString()}</li>
        ))}
      </ul>

      <h3 className="text-3xl font-bold mt-8 text-purple-700">Set Reminders:</h3>
      <div className="space-y-4">
        <input
          id="reminderMessage"
          type="text"
          placeholder="Enter reminder message"
          className="w-full p-3 border border-yellow-400 rounded-md focus:ring-2 focus:ring-yellow-500"
        />
        <DatePicker
          selected={null}
          onChange={(date) => handleSetReminder(date)}
          className="p-2 border border-yellow-400 rounded-md focus:ring-2 focus:ring-yellow-500"
        />
        <button
          onClick={() => handleSetReminder()}
          className="px-5 py-3 bg-gradient-to-r from-green-400 to-lime-500 text-white rounded-lg shadow-lg hover:from-green-500 hover:to-lime-600 focus:outline-none"
        >
          Set Reminder
        </button>
      </div>

      {showDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-2xl font-semibold mb-2 text-purple-700">Reminder Set Successfully!</p>
            <p className="text-gray-700">
              You will receive an email and SMS notification 2-3 days in advance to carry pads.
            </p>
            <button
              onClick={() => setShowDialog(false)}
              className="px-5 py-3 bg-gradient-to-r from-pink-400 to-red-500 text-white rounded-lg shadow-lg hover:from-pink-500 hover:to-red-600 focus:outline-none mt-4"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CycleTracking;
