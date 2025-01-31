import React, { useEffect, useState } from 'react';
import { deleteListing, getAllListings } from '../../apis/Api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import officiallogo from "../../assets/officiallogo.png";
import { Link } from 'react-router-dom';
import { FaTrash, FaEye, FaPaw } from 'react-icons/fa';

const AdminDashboard = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllListings()
      .then(response => {
        if (response.data && Array.isArray(response.data.listings)) {
          setPets(response.data.listings);
        } else {
          console.error('Expected an array but got:', response.data);
          toast.error('Unexpected response format from server.');
        }
        setLoading(false);
      })
      .catch(error => {
        toast.error("Failed to fetch pet data");
        console.error("There was an error fetching the pet data!", error);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    const confirmDialog = window.confirm("Are you sure you want to delete?");
    if (confirmDialog) {
      deleteListing(id).then((res) => {
        if (res.status === 201) {
          toast.success(res.data.message);
          setPets(pets.filter(pet => pet._id !== id));
        }
      }).catch((error) => {
        if (error.response.status === 500 || error.response.status === 400) {
          toast.error(error.response.data.message);
        }
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-brown-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brown-50">
      <nav className="bg-brown-800 shadow-md">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img src={officiallogo} alt="Logo" className="h-10 w-auto mr-3" />
              <span className="text-2xl font-bold text-brown-100">AdoptAPet</span>
            </div>
            <Link to="/admin/addlisting" className="bg-brown-600 hover:bg-brown-700 text-white font-bold py-2 px-4 rounded transition duration-300">
              Add New Pet
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-brown-800">All Pets</h1>
          <span className="text-lg font-semibold text-brown-600 bg-brown-200 px-3 py-1 rounded-full">
            Total: {pets.length}
          </span>
        </div>

        <div className="grid grid-cols-responsive gap-6">
          {pets.map(pet => (
            <div key={pet._id} className="bg-white rounded-lg shadow-lg overflow-hidden border border-brown-200 transition duration-300 hover:shadow-xl">
              <img
                src={`http://localhost:5500/listings/${pet.petImage}`}
                alt={pet.petName}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-brown-800 mb-2">{pet.petName}</h2>
                <p className="text-sm text-brown-600 mb-3 flex items-center">
                  <FaPaw className="mr-2" /> {pet.breed}
                </p>
                <div className="flex justify-between items-center">
                  <Link
                    to={`/admin/updatelisting/${pet._id}`}
                    className="flex items-center px-3 py-2 bg-brown-600 text-white rounded hover:bg-brown-700 transition duration-300"
                  >
                    <FaEye className="mr-2" /> View
                  </Link>
                  <button
                    onClick={() => handleDelete(pet._id)}
                    className="flex items-center px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
                  >
                    <FaTrash className="mr-2" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;