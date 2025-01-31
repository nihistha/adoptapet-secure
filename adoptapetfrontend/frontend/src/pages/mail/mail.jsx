import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import SchedulePickupModal from '../../components/schedulePickupModal';
import { deleteApplicationApi, getUserApplicationApi ,scheduleMeetApi} from '../../apis/Api';
import {AcceptedCard,NoMailCard,RejectedCard} from "../../components/mailcard"
import {toast} from "react-toastify"
const Mail = () => {
  const [applications, setApplications] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUserAndApplications = async () => {
      try {
        const userId = localStorage.getItem('_id');
        const response = await getUserApplicationApi(userId);
        const applicationsData = response.data.applications;
        setApplications(applicationsData);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
        setIsLoading(false);
      }
    };
    fetchUserAndApplications();
  }, []);

  const handleNext = () => {
    setIsModalOpen(true);
  };

  const handleModalSubmit = async (date, timeSlot) => {
    try {
      const meetData = {
        "scheduledDate": date,
        "pickupTime": timeSlot,
        "pet": applications[currentIndex].petId 
      };
  
      const response = await scheduleMeetApi(meetData);
  
      if (response.data.success) {
        console.log('Meet-up scheduled successfully:', response.data);
        const applicationId = applications[currentIndex]._id;
        const deleteResponse = await deleteApplicationApi(applicationId);
    
        if (deleteResponse.data.success) {
          console.log('Application deleted successfully');
          
          // Remove the application from the state
          setApplications(prevApplications => 
            prevApplications.filter(app => app._id !== applicationId)
          );
  
          setIsModalOpen(false);
          toast.success("Your meet has been scheduled and your application has been removed");
          
          // If you're using applicationsWithPetDetails state, update it as well
          setApplications(prevApplications => 
            prevApplications.filter(app => app._id !== applicationId)
          );
  
        } else {
          console.error('Failed to delete application:', deleteResponse.data.message);
          toast.warning("Meet scheduled, but there was an issue removing your application. Please contact support.");
        }
      } else {
        console.error('Failed to schedule meet-up:', response.data.message);
        // Optionally, show an error message to the user
      }
    } catch (error) {
      console.error('Error scheduling meet-up:', error);
      // Optionally, show an error message to the user
    }
  };
  const renderContent = () => {
    if (isLoading) {
      return <p className="text-center text-xl">Loading...</p>;
    }

    if (error) {
      return <p className="text-center text-xl text-red-600">Error: {error}</p>;
    }
    const validApplications = applications.filter(app => app.isApproved === 'accepted' || app.isApproved === 'rejected');

    if (validApplications.length === 0) {
      return <NoMailCard />;
    }

    const currentApp = applications[currentIndex];

    if (currentApp.isApproved === 'accepted') {
      return <AcceptedCard application={currentApp} onNext={handleNext} />;
    } else if (currentApp.isApproved === 'rejected') {
      return <RejectedCard application={currentApp} />;
    } else {
      // If current application is null, find the next non-null application
      const nextValidIndex = applications.findIndex((app, index) => 
        index > currentIndex && (app.isApproved === 'accepted' || app.isApproved === 'rejected')
      );
      if (nextValidIndex !== -1) {
        setCurrentIndex(nextValidIndex);
        return null; // This will cause a re-render with the new index
      } else {
        return <NoMailCard />;
      }
    }
  };

  return (
    <div className="min-h-screen bg-brown-100">
      <Navbar />
      <div className="container mx-auto p-4 pt-24">
        <div className="bg-brown-200 rounded-lg p-8 max-w-2xl mx-auto mt-8">
          <h1 className="text-3xl font-bold text-center text-brown-800 mb-8">My Inbox</h1>
          {renderContent()}
        </div>
      </div>
      <SchedulePickupModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
};

export default Mail;