import React, { useState, useEffect } from 'react';
import { getAllMeetApi } from '../../apis/Api';

const MeetList = () => {
  const [meets, setMeets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMeets = async () => {
      try {
        const response = await getAllMeetApi();
        setMeets(response.data.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch meets');
        setLoading(false);
      }
    };

    fetchMeets();
  }, []);

  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (error) return <div className="text-center py-4 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8 bg-white">
      <h1 className="text-2xl font-bold mb-6 text-[#8B4513]">Scheduled Pickups</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {meets.map(meet => (
          <div key={meet._id} className="bg-[#F5E6D3] rounded-lg shadow-md overflow-hidden max-w-[300px]">
            <div className="relative pb-[60%]">
              <img 
                src={`http://localhost:5500/listings/${meet.pet.petImage}`}
                alt={meet.pet.petName} 
                className="absolute top-0 left-0 w-full h-full object-cover rounded-t-lg"
              />
            </div>
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2 text-[#8B4513]">{meet.pet.petName}</h2>
              <p className="text-sm text-[#5D3A1A]">
                Scheduled to be picked up at
              </p>
              <p className="text-sm font-semibold text-[#5D3A1A]">
                {new Date(meet.scheduledDate).toLocaleDateString()}
              </p>
              <p className="text-sm font-semibold text-[#5D3A1A] mb-3">
                {meet.pickupTime}:00 pm
              </p>
              <button className="w-full bg-[#8B4513] text-white py-2 px-4 rounded hover:bg-[#5D3A1A] transition duration-300">
                Done
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MeetList;
