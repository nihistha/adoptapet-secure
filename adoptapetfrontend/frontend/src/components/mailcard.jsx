import React from 'react';

export const AcceptedCard = ({ application, onNext }) => (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-md w-full">
      <h2 className="text-2xl font-bold mb-4">Congratulations!</h2>
      <p className="mb-6 text-gray-700">
        {application.adminMessage}
      </p>
      <div className="flex justify-end">
        <button
          onClick={onNext}
          className="bg-brown-600 text-white px-4 py-2 rounded hover:bg-brown-700 transition-colors"
        >
          Next&gt;
        </button>
      </div>
    </div>
  );
  
 export const RejectedCard = ({ application }) => (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-md w-full">
      <h2 className="text-2xl font-bold mb-4">Application Status</h2>
      <p className="mb-6 text-gray-700">
       {application.adminMessage}
      </p>
    </div>
  );
  
 export const NoMailCard = () => (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-md w-full">
      <p className="text-center text-xl text-gray-700">You don't have any mails.</p>
    </div>
  );

