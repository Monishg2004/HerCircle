import React, { useState } from 'react';
import { FaPen, FaSave } from 'react-icons/fa';
import { motion } from 'framer-motion';

const PersonalJournal = () => {
  const [journalEntry, setJournalEntry] = useState('');
  const [savedEntries, setSavedEntries] = useState([]);

  const handleEntryChange = (event) => {
    setJournalEntry(event.target.value);
  };

  const saveEntry = () => {
    if (journalEntry.trim() !== '') {
      setSavedEntries([...savedEntries, journalEntry]);
      setJournalEntry('');
    }
  };

  return (
    <div className="bg-gradient-to-br from-purple-500 to-pink-300 text-gray-900 min-h-screen p-10">
      <h2 className="text-3xl font-semibold mb-4">Personal Journal</h2>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h3 className="text-2xl font-semibold">Write Your Thoughts</h3>
          <div className="mt-4">
            <textarea
              className="w-full px-4 py-2 bg-white rounded-lg shadow focus:outline-none"
              placeholder="Start writing your thoughts and emotions..."
              rows="6"
              value={journalEntry}
              onChange={handleEntryChange}
            ></textarea>
          </div>
          <div className="mt-2">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 focus:outline-none"
              onClick={saveEntry}
            >
              Save Entry
            </button>
          </div>
        </div>
        <div>
          <h3 className="text-2xl font-semibold">Your Saved Entries</h3>
          <div className="mt-4 space-y-4">
            {savedEntries.map((entry, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow"
              >
                <p>{entry}</p>
              </motion.div>
            ))}
            {savedEntries.length === 0 && (
              <div className="bg-white rounded-lg shadow p-4">
                <p>No entries saved yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalJournal;
