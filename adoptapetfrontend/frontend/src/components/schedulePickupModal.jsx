import React, { useState, useEffect } from 'react';

const SchedulePickupModal = ({ isOpen, onClose, onSubmit }) => {
    const [date, setDate] = useState('');
    const [timeSlot, setTimeSlot] = useState(1);
  
    if (!isOpen) return null;
    const handleSubmit = () => {
        // Validate input before submitting
        if (date && timeSlot >= 1 && timeSlot <= 8) {
          onSubmit(date, timeSlot);
          // Reset form after submission
          setDate('');
          setTimeSlot(1);
        } else {
          alert('Please enter a valid date and time slot (1-8).');
        }
      };
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-brown-100 rounded-lg p-6 max-w-sm w-full">
          <h2 className="text-2xl font-bold mb-4 text-brown-800">Schedule A pick up</h2>
          <div className="mb-4">
            <label className="block text-brown-700 mb-2" htmlFor="date">Pick a date</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-2 border border-brown-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-brown-700 mb-2" htmlFor="timeSlot">Pick a time slot (1-8) pm</label>
            <input
              type="number"
              id="timeSlot"
              value={timeSlot}
              onChange={(e) => setTimeSlot(Math.min(8, Math.max(1, parseInt(e.target.value))))}
              min="1"
              max="8"
              className="w-full p-2 border border-brown-300 rounded"
            />
          </div>
          <button
            onClick={handleSubmit}
            className="w-full bg-brown-600 text-white py-2 rounded hover:bg-brown-700 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    );
  };
  export default SchedulePickupModal;