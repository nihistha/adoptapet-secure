import React from 'react';
import { useNavigate } from 'react-router-dom';

const PetCard = ({ pet, onDelete }) => {
  const navigate = useNavigate();
  const handleUpdate = () => {
    navigate(`/admin/updatelisting/${pet._id}`);
  };

  return (
    // <div className="bg-white dark:bg-gray-900 shadow-xl rounded-xl p-6">
    //   <div className="flex justify-center">
    //     <img className="h-40 w-40 rounded-lg" src={`http://localhost:5500/listings/${pet.petImage}`} alt={pet.petName} />
    //   </div>

    //   <div className="mt-5 text-center">
    //     <h3 className="text-lg font-medium text-gray-800 dark:text-white" id="modal-title">
    //       {pet.petName}
    //     </h3>
    //     <p className="mt-2 text-gray-500 dark:text-gray-400">{pet.gender}</p>
    //   </div>

    //   <div className="mt-4 flex justify-between">
    //     <button
    //       onClick={handleUpdate}
    //       className="px-4 py-2.5 text-sm font-medium text-green-600 border border-green-600 rounded-md transition-colors duration-300 transform hover:bg-green-100 focus:outline-none focus:ring focus:ring-green-300 focus:ring-opacity-40"
    //     >
    //       Update
    //     </button>
    //     <button
    //       onClick={() => onDelete(pet._id)}
    //       className="px-4 py-2.5 text-sm font-medium text-red-600 border border-red-600 rounded-md transition-colors duration-300 transform hover:bg-red-100 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-40"
    //     >
    //       Delete
    //     </button>
    //   </div>
    // </div>
        <body class="flex items-center justify-center min-h-screen bg-gray-100">
        <div class="bg-white rounded-lg w-68 h-96 shadow-md p-6 max-w-sm">
            <img src={`http://localhost:5500/listings/${pet.petImage}`} alt="Card Image" class="w-full h-60 rounded-t-lg"/>
            <div class="p-4">
                <h2 class="text-xl font-semibold text-center mb-2">{pet.petName}</h2>
                <div class="flex items-center justify-between">
                    <button class="px-10 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">Update</button>
                    <button class="px-10 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Delete</button>
                </div>
            </div>
        </div>
    </body>
  );
};

export default PetCard;
