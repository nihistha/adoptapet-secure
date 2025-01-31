import React from 'react';
import { useNavigate } from 'react-router-dom';

const ApplicationCard = ({ app,onDelete }) => {
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`/update_application/${app._id}`);
  };
  const handleDeleteClick = () => {
    if (window.confirm('Are you sure you want to cancel this application?')) {
      onDelete(app._id);
    }
  };


  return (
    <div className="bg-[#D2B48C] rounded-2xl shadow-md overflow-hidden flex items-center p-4 w-100">
      <img 
        src={`http://localhost:5500/listings/${app.petImage}`} 
        alt={app.petName} 
        className="w-24 h-24 rounded-full object-cover mr-4" 
      />
      <div className="flex-grow">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-semibold text-black">{app.petName}</h3>
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-200 text-yellow-800">
            Pending
          </span>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={handleEditClick}
            className="flex-1 bg-[#8B4513] text-white py-2 rounded-md hover:bg-[#A0522D] transition duration-300"
          >
            Edit Application
          </button>
          <button
            onClick={handleDeleteClick}
            className="flex-1 bg-[#8B4513] text-white py-2 rounded-md hover:bg-[#A0522D] transition duration-300"
          >
            Cancel Application
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationCard;