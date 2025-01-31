import React, { useState, useEffect } from 'react';
import officiallogo from '../../assets/officiallogo.png';
import dog from "../../assets/dog.png";
import { useParams } from 'react-router-dom';
import { getSingleApplicationApi, updateApplicationApi } from '../../apis/Api';
import { getoneListing } from '../../apis/Api';
import {toast} from "react-toastify";
const ApplicationDetails = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { id } = useParams();
  const [application, setApplication] = useState(null);
  const[applicationsWithPetDetails,setApplicationsWithPetDetails]=useState([]);
  const [adminMessage, setAdminMessage] = useState('');
  const [isApproved, setIsApproved] = useState('');

  useEffect(() => {
    const getApplication = async () => {
      try {
        const response = await getSingleApplicationApi(id);
        setApplication(response.data);
      } catch (error) {
        console.error('Error fetching pet details:', error);
      }
    };

    getApplication();
  }, [id]);

  useEffect(() => {
    const fetchPetDetails = async () => {
      if (application) {
        try {
          const petResponse = await getoneListing(application.petId);
          const updatedApplication = {
            ...application,
            petImage: petResponse.data.petImage,
            petName: petResponse.data.petName
          };
          setApplicationsWithPetDetails(updatedApplication);
        } catch (error) {
          console.error('Error fetching pet details:', error);
          toast.error('Failed to fetch pet details');
        }
      }
    };

    if (application) {
      fetchPetDetails();
    }
  }, [application]);
  const handleApproveApplication = async (status) => {
    try {
      const updatedApplication = { 
        adminMessage, 
        isApproved: status 
      };
      console.log('Sending update:', updatedApplication); // Debug log
      const response = await updateApplicationApi(id, updatedApplication);
      console.log('Update response:', response); // Debug log
      setApplication(response.data);
      setIsOpen(false);
      toast.success("Application Reviewed")
    } catch (error) {
      console.error('Error updating application:', error);
    }
  };

  if (!application) {
    return <div className="flex justify-center items-center h-screen text-2xl font-semibold text-brown-800">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-brown-50 font-sans">
      <nav className="bg-brown-800 shadow-md">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img src={officiallogo} alt="Logo" className="h-8 w-auto mr-3" />
              <span className="text-xl font-bold text-brown-100">AdoptAPet</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-brown-200">
          <div className="md:flex">
            <div className="md:w-1/3 p-8 bg-brown-100">
              <h2 className="text-2xl font-bold mb-6 text-brown-800">Pet Details</h2>
              <div className="flex justify-center mb-6">
                <img src={`http://localhost:5500/listings/${application.petImage}`} alt="Pet photo" className="h-48 w-auto rounded-lg shadow-md" />
              </div>
              {/* Add more pet details here if available */}
            </div>
            <div className="md:w-2/3 p-8">
              <h2 className="text-3xl font-bold mb-6 text-brown-800">Applicant Details</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm uppercase tracking-wide text-brown-600">Name</p>
                  <p className="font-semibold text-lg text-brown-800">{application.name}</p>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-wide text-brown-600">Age</p>
                  <p className="font-semibold text-lg text-brown-800">{application.age}</p>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-wide text-brown-600">Occupation</p>
                  <p className="font-semibold text-lg text-brown-800">{application.occupation}</p>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-wide text-brown-600">Email</p>
                  <p className="font-semibold text-lg text-brown-800">{application.email}</p>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-wide text-brown-600">Phone</p>
                  <p className="font-semibold text-lg text-brown-800">{application.phonenumber}</p>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-wide text-brown-600">Address</p>
                  <p className="font-semibold text-lg text-brown-800">{application.address}</p>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-bold mb-4 text-brown-800">Other Information</h3>
                <div className="bg-brown-50 rounded-lg p-4 border border-brown-200">
                  <p className="mb-2"><span className="font-semibold text-brown-700">Other pets present:</span> {application.haveDog}</p>
                  <p className="mb-2"><span className="font-semibold text-brown-700">Housing Situation:</span> {application.livingSituation}</p>
                  <p className="mb-2"><span className="font-semibold text-brown-700">Reason for adoption:</span></p>
                  <p className="italic text-brown-600">{application.reasonsForAdopting}</p>
                </div>
              </div>

              <div className="mt-8">
                <button
                  onClick={() => setIsOpen(true)}
                  className="px-6 py-3 bg-brown-600 text-white font-semibold rounded-lg shadow-md hover:bg-brown-700 transition duration-300 ease-in-out"
                >
                  Review Application
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>


{isOpen && (
  <div className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center">
    <div className="bg-brown-50 rounded-lg shadow-xl w-full max-w-md mx-4">
      <div className="flex justify-between items-center border-b border-brown-200 p-4">
        <h3 className="text-lg font-medium text-brown-800">Review Applicant</h3>
        <button 
          onClick={() => setIsOpen(false)} 
          className="text-brown-400 hover:text-brown-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brown-500 rounded-full p-1"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <form className="p-4">
        <div className="mb-4">
          <label htmlFor="message" className="block text-sm font-medium text-brown-700 mb-2">
            Message:
          </label>
          <textarea
            onChange={(e) => setAdminMessage(e.target.value)}
            id="message"
            className="w-full h-32 px-3 py-2 text-brown-700 border border-brown-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500"
            placeholder="Enter your message here..."
          ></textarea>
        </div>
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => handleApproveApplication("rejected")}
            className="px-4 py-2 text-sm font-medium text-brown-700 bg-brown-200 rounded-md hover:bg-brown-300 focus:outline-none focus:ring-2 focus:ring-brown-500 transition-colors duration-200"
          >
            Reject
          </button>
          <button
            onClick={() => handleApproveApplication("accepted")}
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-brown-600 rounded-md hover:bg-brown-700 focus:outline-none focus:ring-2 focus:ring-brown-500 transition-colors duration-200"
          >
            Approve
          </button>
        </div>
      </form>
    </div>
  </div>
)}

    </div>
  );
};

export default ApplicationDetails;