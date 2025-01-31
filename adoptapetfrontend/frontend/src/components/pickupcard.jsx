import React from 'react';

const PickUpScheduleCard = ({ meetTimes }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  const formatTime = (hour) => {
    return `${hour % 12 || 12} ${hour < 12 ? 'AM' : 'PM'}`;
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="bg-brown-600 text-white text-xl font-bold py-4 px-6">
        Pick Up Schedule
      </div>
      <div className="p-6">
        {meetTimes.map((meet, index) => (
          <div key={index} className="mb-4 last:mb-0">
            <p className="text-lg font-semibold text-brown-800">
              {meet.petName} is scheduled to be picked up
            </p>
            <p className="text-md text-brown-600">
              at {formatDate(meet.scheduledDate)} at {formatTime(meet.pickupTime)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PickUpScheduleCard;