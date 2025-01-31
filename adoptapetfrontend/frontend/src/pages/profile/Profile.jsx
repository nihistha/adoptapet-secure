import React, { useState, useEffect } from 'react';
import { FaEdit, FaCheck, FaPhone, FaEnvelope } from 'react-icons/fa';
import Navbar from '../../components/Navbar';
import ApplicationCard from '../../components/applicationcards';
import { deleteApplicationApi, getUserApplicationApi,getoneListing } from '../../apis/Api';
import { toast } from 'react-toastify';

const ProfilePage = () => {

  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [applicationsWithPetDetails,setApplicationsWithPetDetails]=useState([]);


  const storedUser = JSON.parse(localStorage.getItem('user'));
  console.log(storedUser)
  useEffect(() => {
    const fetchUserAndApplications = async () => {
      try {
        const response = await getUserApplicationApi(storedUser._id);
  
        // Ensure response exists and check for applications
        if (response.data.success === false && response.data.message === "No applications found for this user") {
          setApplications([]); // Set an empty array to prevent errors in UI
          setError("No applications found for this user."); // Set meaningful error message
        } else if (response.data.applications && response.data.applications.length > 0) {
          setApplications(response.data.applications);
        } else {
          setApplications([]); // Set empty if no applications are returned
        }
        
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("An error occurred while fetching applications.");
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchUserAndApplications();
  }, []);
  



  useEffect(() => {
    const fetchPetDetails = async () => {
      try {
        const updatedApplications = await Promise.all(
          applications.map(async (application, index) => {
            try {
              console.log(`Fetching pet details for application ${index}:`, application);
              const petResponse = await getoneListing(application.petId);
              console.log(`Pet response for application ${index}:`, petResponse);
              return {
                ...application,
                petImage: petResponse.data.petImage,
                petName: petResponse.data.petName
              };
            } catch (error) {
              console.error(`Error fetching pet details for application ${index}:`, error);
              console.error('Application data:', application);
              return application;
            }
          })
        );
        console.log('Updated applications with pet details:', updatedApplications);
        setApplicationsWithPetDetails(updatedApplications);
      } catch (error) {
        console.error('Error in fetchPetDetails:', error);
      }
    };
  
    if (applications.length > 0) {
      console.log('Starting to fetch pet details for', applications.length, 'applications');
      fetchPetDetails();
    } else {
      console.log('No applications to fetch pet details for. Applications state:', applications);
    }
  }, [applications]);
  console.log(applicationsWithPetDetails)


  const handleEdit = () => setIsEditing(!isEditing);
  const handleSave = () => {
    // Implement save logic here
    setIsEditing(false);
  };
  const handleDeleteApplication = async (applicationId) => {
    try {
      await deleteApplicationApi(applicationId);
      setApplicationsWithPetDetails(prevApplications => 
        prevApplications.filter(app => app._id !== applicationId)
      );
      toast.success('Application cancelled successfully');
    } catch (error) {
      console.error('Error deleting application:', error);
      toast.error('Failed to cancel application');
    }
  };
  return (
    <>
    <Navbar />
    <div className="bg-[#AC8968] min-h-screen p-8 pt-24">
      <div className="max-w-3xl mx-auto rounded-lg p-6 mb-8 bg-[#AC8968] shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-white">
            {isEditing ? (
              <input
                type="text"
                value={storedUser.fullname}
                className="bg-transparent border-b-2 border-white focus:outline-none focus:border-yellow-300 text-3xl font-bold text-white w-full"
              />
            ) : storedUser.fullname}
          </h1>
          <button
            onClick={isEditing ? handleSave : handleEdit}
            className="flex items-center bg-[#8B4513] text-white px-3 py-1 rounded-full hover:bg-[#A0522D] transition duration-300 text-sm"
          >
            {isEditing ? <FaCheck className="mr-1" /> : <FaEdit className="mr-1" />}
            {isEditing ? 'Save' : 'Edit'}
          </button>
        </div>
        <div className="space-y-3">
          <p className="flex items-center text-white">
            <FaPhone className="mr-2 text-yellow-300" />
            {isEditing ? (
              <input
                type="tel"
                value={storedUser.phonenumber}
                className="bg-transparent border-b-2 border-white focus:outline-none focus:border-yellow-300 w-full text-white"
              />
            ) : storedUser.phonenumber}
          </p>
          <p className="flex items-center text-white">
            <FaEnvelope className="mr-2 text-yellow-300" />
            {isEditing ? (
              <input
                type="email"
                value={storedUser.email}
                className="bg-transparent border-b-2 border-white focus:outline-none focus:border-yellow-300 w-full text-white"
              />
            ) : storedUser.email}
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-semibold text-white mb-6">Your Applications</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <p className="text-white">Loading applications...</p>
        ) : error ? (
          <p className="text-red-300">{error}</p>
        ) : applicationsWithPetDetails.length === 0 ? (
          <p className="text-white">No applications found.</p>
        ) : (
          applicationsWithPetDetails.map((app) => (
            <ApplicationCard key={app._id} app={app} onDelete={handleDeleteApplication} />
          ))
        )}
      </div>
    </div>
  </>
  );
};

export default ProfilePage;