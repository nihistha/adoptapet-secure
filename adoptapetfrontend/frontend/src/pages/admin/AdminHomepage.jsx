import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaPaw, FaPlus, FaClipboardList, FaDollarSign } from 'react-icons/fa';
import officiallogo from '../../assets/officiallogo.png';
import { getDonationApi } from '../../apis/Api';

const Dashboard = () => {

  const [totalDonations, setTotalDonations] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);


    useEffect(() => {
      const fetchDonations = async () => {
        try {
          const response = await getDonationApi();
          console.log('API Response:', response); // Log the entire response
          if (response.data && response.data.success) {
            const donations = response.data.donations;
            const total = donations.reduce((sum, donation) => sum + donation.amount, 0);
            setTotalDonations(total);
          } else {
            throw new Error(response.data.message || 'Unexpected API response structure');
          }
        } catch (err) {
          console.error('Error fetching donations:', err);
          setError(`Failed to load donation data: ${err.message}`);
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchDonations();
    }, []);

  return (
    <div className="flex h-screen bg-brown-50">
      {/* Sidebar */}
      <div className="w-64 bg-brown-800 text-brown-100">
        <div className="flex items-center justify-center h-20 shadow-md">
          <img src={officiallogo} alt="Logo" className="h-10 w-auto mr-3" />
          <span className="text-2xl font-semibold">AdoptAPet</span>
        </div>
        <nav className="mt-5">
          {[
            { icon: FaHome, text: 'Home', path: '/admin' },
            { icon: FaPaw, text: 'Listings', path: '/admin/dashboard' },
            { icon: FaPlus, text: 'Add Listings', path: '/admin/addlisting' },
            { icon: FaClipboardList, text: 'Applications', path: '/admin/application' },
            { icon: FaDollarSign, text: 'Donations', path: '/admin/donations' },
          ].map((item, index) => (
            <Link 
              key={index}
              to={item.path}
              className="flex items-center mt-4 py-2 px-6 hover:bg-brown-700 hover:bg-opacity-25 transition-colors duration-200"
            >
              <item.icon className="h-5 w-5" />
              <span className="mx-4">{item.text}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-x-hidden overflow-y-auto">
        <div className="container mx-auto px-6 py-8">
          <h3 className="text-3xl font-semibold text-brown-800">Hi, Welcome back 👋</h3>
          
          {/* Stats Grid */}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: 'Available pets', value: '98', color: 'bg-green-500' },
              { title: 'Pets adopted', value: '20', color: 'bg-blue-500' },
              { title: 'Users', value: '1K', color: 'bg-yellow-500' },
              { title: 'New Applications', value: '100', color: 'bg-red-500' },
            ].map((stat, index) => (
              <div key={index} className={`${stat.color} bg-opacity-40 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-${stat.color.split('-')[1]}-600 text-white font-medium group`}>
                <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
                  <svg width="30" height="30" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={`stroke-current text-${stat.color.split('-')[1]}-800 transform transition-transform duration-500 ease-in-out`}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                  </svg>
                </div>
                <div className="text-right">
                  <p className="text-2xl">{stat.value}</p>
                  <p>{stat.title}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Donations and Booked Cards */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-brown-400 bg-opacity-75 rounded-lg shadow-lg p-5 text-white">
              <h2 className="text-2xl font-semibold mb-4">Donations</h2>
              <h1 className="text-4xl font-bold mb-2">{totalDonations.toFixed(2)} rs</h1>
              <p className="text-green-200">+2.6% than last month</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;