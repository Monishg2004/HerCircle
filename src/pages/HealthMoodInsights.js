import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaRegSmile, FaMeh, FaFrown } from 'react-icons/fa';

const HealthMoodInsights = () => {
  const [moodData, setMoodData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedMood, setSelectedMood] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const savedMoodData = localStorage.getItem('moodData');
    if (savedMoodData) {
      setMoodData(JSON.parse(savedMoodData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('moodData', JSON.stringify(moodData));
  }, [moodData]);

  const handleMoodSelection = (mood) => {
    setSelectedMood(mood);
    setSubmitted(false);
  };

  const handleMoodSubmission = () => {
    if (selectedDate && selectedMood) {
      const filteredMoodData = moodData.filter(entry => entry.date !== selectedDate);
      const newMoodData = [...filteredMoodData, { 
        date: selectedDate, 
        mood: selectedMood,
        timestamp: new Date().toISOString()
      }];
      newMoodData.sort((a, b) => new Date(b.date) - new Date(a.date));
      setMoodData(newMoodData);
      setSubmitted(true);
      setSelectedMood('');
    }
  };

  const renderCalendar = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const calendarDays = [];

    for (let i = 0; i < firstDay.getDay(); i++) {
      calendarDays.push(<div key={`empty-${i}`} className="h-24" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const moodEntry = moodData.find(entry => entry.date === date);
      calendarDays.push(
        <motion.div
          key={date}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-teal-100 rounded-lg shadow p-2 h-24 relative"
        >
          <p className="text-sm font-semibold">{day}</p>
          {moodEntry && (
            <div className="absolute inset-0 flex items-center justify-center">
              {moodEntry.mood === 'happy' && <FaRegSmile size={24} className="text-lime-400" />}
              {moodEntry.mood === 'neutral' && <FaMeh size={24} className="text-purple-400" />}
              {moodEntry.mood === 'sad' && <FaFrown size={24} className="text-indigo-400" />}
            </div>
          )}
        </motion.div>
      );
    }
    return calendarDays;
  };

  const getMoodStats = () => {
    const lastThirtyDays = new Date();
    lastThirtyDays.setDate(lastThirtyDays.getDate() - 30);
    const recentMoods = moodData.filter(entry => new Date(entry.date) >= lastThirtyDays);
    return {
      happy: recentMoods.filter(entry => entry.mood === 'happy').length,
      neutral: recentMoods.filter(entry => entry.mood === 'neutral').length,
      sad: recentMoods.filter(entry => entry.mood === 'sad').length
    };
  };

  const moodStats = getMoodStats();

  return (
    <div className="bg-gradient-to-br from-teal-200 to-cyan-200 min-h-screen p-6">
      <div className="max-w-6xl mx-auto bg-rose-100 rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-semibold mb-6">Health & Mood Insights</h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-2xl font-semibold mb-4">Mood Patterns</h3>
            <div className="bg-pink-100 p-4 rounded-lg mb-4">
              <h4 className="font-semibold mb-2">Last 30 Days Summary:</h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <FaRegSmile size={24} className="mx-auto text-lime-400" />
                  <p className="mt-1">{moodStats.happy} days</p>
                </div>
                <div className="text-center">
                  <FaMeh size={24} className="mx-auto text-purple-400" />
                  <p className="mt-1">{moodStats.neutral} days</p>
                </div>
                <div className="text-center">
                  <FaFrown size={24} className="mx-auto text-indigo-400" />
                  <p className="mt-1">{moodStats.sad} days</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              {moodData.slice(0, 10).map((entry, index) => (
                <motion.div
                  key={entry.date}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-yellow-200 p-4 rounded-lg flex items-center justify-between"
                >
                  <span>{new Date(entry.date).toLocaleDateString()}</span>
                  <div>
                    {entry.mood === 'happy' && <FaRegSmile size={24} className="text-lime-400" />}
                    {entry.mood === 'neutral' && <FaMeh size={24} className="text-purple-400" />}
                    {entry.mood === 'sad' && <FaFrown size={24} className="text-indigo-400" />}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-4">Monthly Calendar</h3>
            <div className="grid grid-cols-7 gap-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center font-semibold text-sm">
                  {day}
                </div>
              ))}
              {renderCalendar()}
            </div>

            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-4">Record Today's Mood</h3>
              <div className="grid grid-cols-3 gap-4">
                <div
                  className={`text-center p-4 rounded-lg cursor-pointer ${
                    selectedMood === 'happy' ? 'bg-lime-200' : 'bg-emerald-100 hover:bg-lime-100'
                  }`}
                  onClick={() => handleMoodSelection('happy')}
                >
                  <FaRegSmile size={32} className="mx-auto text-lime-400" />
                  <p className="mt-2">Happy</p>
                </div>
                <div
                  className={`text-center p-4 rounded-lg cursor-pointer ${
                    selectedMood === 'neutral' ? 'bg-purple-300' : 'bg-emerald-100 hover:bg-purple-100'
                  }`}
                  onClick={() => handleMoodSelection('neutral')}
                >
                  <FaMeh size={32} className="mx-auto text-purple-400" />
                  <p className="mt-2">Neutral</p>
                </div>
                <div
                  className={`text-center p-4 rounded-lg cursor-pointer ${
                    selectedMood === 'sad' ? 'bg-indigo-200' : 'bg-emerald-100 hover:bg-indigo-100'
                  }`}
                  onClick={() => handleMoodSelection('sad')}
                >
                  <FaFrown size={32} className="mx-auto text-indigo-400" />
                  <p className="mt-2">Sad</p>
                </div>
              </div>
              <button
                onClick={handleMoodSubmission}
                className={`mt-4 px-6 py-2 bg-teal-400 text-white rounded-lg shadow hover:bg-teal-500 ${
                  (!selectedMood || submitted) ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={!selectedMood || submitted}
              >
                {submitted ? 'Mood Recorded!' : 'Record Mood'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthMoodInsights;
