import React, { useState, useEffect } from 'react';
import officiallogo from '../../assets/officiallogo.png';
import { getApplicationsApi, getoneListing } from '../../apis/Api';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const AdminApplication = () => {
  const [applications, setApplication] = useState([]);
  const [applicationsWithPetDetails, setApplicationsWithPetDetails] = useState([]);

  useEffect(() => {
    getApplicationsApi()
      .then(response => {
        if (response.data && Array.isArray(response.data.applications)) {
          setApplication(response.data.applications);
        } else {
          console.error('Expected an array but got:', response.data);
          toast.error('Unexpected response format from server.');
        }
      })
      .catch(error => {
        toast.error('Failed to fetch pet data');
        console.error('There was an error fetching the pet data!', error);
      });
  }, []);

  useEffect(() => {
    const fetchPetDetails = async () => {
      const updatedApplications = await Promise.all(
        applications.map(async application => {
          try {
            const petResponse = await getoneListing(application.petId);
            return {
              ...application,
              petImage: petResponse.data.petImage,
              petName: petResponse.data.petName
            };
          } catch (error) {
            console.error('Error fetching pet details:', error);
            toast.error('Failed to fetch pet details');
            return application;
          }
        })
      );
      setApplicationsWithPetDetails(updatedApplications);
    };

    if (applications.length > 0) {
      fetchPetDetails();
    }
  }, [applications]);

  return (
    <div className="min-h-screen bg-brown-50">
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
        <h1 className="text-3xl font-bold text-brown-800 mb-8">Adoption Applications</h1>
        <div className="grid md:grid-cols-2 gap-6">
          {applicationsWithPetDetails.map(application => (
            <div key={application._id} className="bg-white rounded-lg shadow-md overflow-hidden border border-brown-200">
              <div className="md:flex">
                <div className="md:flex-shrink-0">
                  <img className="h-full w-24 object-cover md:w-48" src={`https://localhost:5500/listings/${application.petImage}`} alt={application.petName} />
                </div>
                <div className="p-8">
                  <div className="uppercase tracking-wide text-sm text-brown-600 font-semibold">{application.petName}</div>
                  <h2 className="block mt-1 text-lg leading-tight font-medium text-brown-800">Applicant: {application.name}</h2>
                  <p className="mt-2 text-brown-600">{application.address}</p>
                  <Link to={`/admin/applicant-detail/${application._id}`} className="mt-4 inline-block px-4 py-2 bg-brown-600 text-white font-semibold rounded-lg hover:bg-brown-700 transition duration-300 ease-in-out">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminApplication;