import React, { useState, useEffect } from 'react';
import { X, CheckCircle } from 'lucide-react';
import Confetti from 'react-confetti';

const CongratulationsModal = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [windowDimensions, setWindowDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <Confetti
        width={windowDimensions.width}
        height={windowDimensions.height}
        colors={['#8B4513', '#A52A2A', '#D2691E', '#CD853F', '#DEB887']}
      />
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full text-center">
        <div className="p-6">
          <div className="flex justify-end">
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="mt-4 flex flex-col items-center">
            <CheckCircle className="text-brown-600 w-16 h-16 mb-4" />
            <h3 className="text-2xl font-bold leading-6 text-brown-800 mb-2">
              Congratulations!
            </h3>
            <p className="text-lg text-brown-600">
              Your application has been accepted.
            </p>
          </div>
        </div>
        <div className="bg-brown-50 px-4 py-3 sm:px-6 rounded-b-lg">
          <button
            type="button"
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-brown-600 text-base font-medium text-white hover:bg-brown-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brown-500 sm:w-auto sm:text-sm"
            onClick={() => setIsOpen(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CongratulationsModal;