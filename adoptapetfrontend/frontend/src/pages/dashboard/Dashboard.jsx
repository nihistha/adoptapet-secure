import React,{useState,useEffect} from 'react'
import "./dashboard.css"
import { getAllListings } from '../../apis/Api';
import {toast} from 'react-toastify'
import {motion } from 'framer-motion'
import steps from "../../assets/steps.png"
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [pets, setPets] = useState([]);
  const navigate = useNavigate();

  const handleNavigateToListings = () => {
    navigate('/pets-category'); // Navigate to the "/listings" route
  };

    useEffect(() => {
      // Fetch the pet data from the backend
      getAllListings()
        .then(response => {
          console.log('API response:', response.data);
          if (response.data && Array.isArray(response.data.listings)) {
            setPets(response.data.listings);
            console.log(setPets)
          } else {
            console.error('Expected an array but got:', response.data);
            toast.error('Unexpected response format from server.');
          }
        })
        .catch(error => {
          toast.error("Failed to fetch pet data"

          );
          console.error("There was an error fetching the pet data!", error);
        });
    }, []);
  return (
    <>
    <Navbar/>
    <div className='dashboard-body'>
    
    <main className="container-fluid p-0">
        <div className="hero-section mb-6">
        <h1 className='Heading-text'>Adopt. Don't shop.</h1>
        <div className="search-section mb-4">
    <div className="input-group custom-input-group">
      <input type="text" className="form-control custom-search-input" placeholder="Search Breed, Size etc.." />
      <div className="input-group-append">
      <button className="btn btn-outline-secondary custom-search-button" type="button">
  <i class="fas fa-search"></i>
</button>

      </div>
    </div>
  </div>
          <div className="text-center mb-4">
            
            <h4>Browse from hundreds of pets choices</h4>
            <div className="btn-container">
              <motion.button whileHover={{scale:1.1}} whileTap = {{scale: 0.9}} type="button" className="btn btn-secondary custom-btn"><i class="fas fa-dog"></i> Dogs</motion.button>
              <motion.button whileHover={{scale:1.1}} whileTap = {{scale: 0.9}} type="button" className="btn btn-secondary custom-btn"><i class="fas fa-cat"></i> Cats</motion.button>
              <motion.button whileHover={{scale:1.1}} whileTap = {{scale: 0.9}} onClick={handleNavigateToListings} type="button" className="btn btn-secondary custom-btn"><i class="fas fa-paw"></i> All Pets</motion.button>
            </div>
          </div>
        </div>
        
        <div className="image-section text-center">
            <h2 className="Heading-text">How it works</h2>
            <img src={steps} alt="Adoption Steps" className="img-fluid" />
          </div>
        <div className="pets-section container">
          <h2 className="text-center Heading-text">Pets Available for Adoption</h2>
          <div className="row row-cols-1 row-cols-md-4 g-4 mt-4">
            {pets.slice(0,4).map(pet => (
              <div key={pet.id} className="col mb-4">
                <div className="card h-100 custom-card">
                  <img src={`http://localhost:5500/listings/${pet.petImage}`} className="card-img-top custom-card-img" alt={pet.petName} />
                  <div className="card-body">
                    <h5 className="card-title">{pet.petName}</h5>
                    <p className="card-text">{pet.petType}</p>
                    <Link 
                      to={`/pet_details/${pet._id}`} 
                      className="btn btn-custom"
                    >
                      Browse Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <section class="bg-#AC8968">
      <div class="container flex flex-col items-center px-4 py-12 mx-auto text-center">
  <h2 class="max-w-2xl mx-auto text-2xl font-semibold tracking-tight text-yellow-50 xl:text-3xl">
    Donate to our Organization
  </h2>
  <p class="max-w-4xl mt-6 text-center text-yellow-50">
    At Adoptapet, we believe every furry friend deserves a loving home. Our dedicated team works tirelessly to rescue, care for, and rehome abandoned and neglected animals. Your support helps fund vital medical care, behavioral training, and community education programs. Together, we can create a world where no pet is left behind. Help us turn lonely paws into happy homes. Donate today and be a hero to a pet in need!
  </p>
  <div class="inline-flex w-full mt-6 sm:w-auto">
    <a href="/donation" class="inline-flex items-center justify-center w-full px-6 py-2 text-white duration-300 bg-brown-900 rounded-lg hover:bg-brown-900 focus:ring focus:ring-blue-300 focus:ring-opacity-80">
      Donate
    </a>
  </div>
</div>
</section>
<footer class="bg-#AC8968">
    <div class="container p-6 mx-auto">
        <div class="lg:flex">
            <div class="w-full -mx-6 lg:w-2/5">
                <div class="px-6">
                    <h1>Adoptapet</h1>

                    <p class="max-w-sm mt-2 text-white-900">Our shelter homes 100+ pets learn more about us.</p>

                    <div class="flex mt-6 -mx-2">
                        <a href="#"
                            class="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                            aria-label="Reddit">
                            <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C21.9939 17.5203 17.5203 21.9939 12 22ZM6.807 10.543C6.20862 10.5433 5.67102 10.9088 5.45054 11.465C5.23006 12.0213 5.37133 12.6558 5.807 13.066C5.92217 13.1751 6.05463 13.2643 6.199 13.33C6.18644 13.4761 6.18644 13.6229 6.199 13.769C6.199 16.009 8.814 17.831 12.028 17.831C15.242 17.831 17.858 16.009 17.858 13.769C17.8696 13.6229 17.8696 13.4761 17.858 13.33C18.4649 13.0351 18.786 12.3585 18.6305 11.7019C18.475 11.0453 17.8847 10.5844 17.21 10.593H17.157C16.7988 10.6062 16.458 10.7512 16.2 11C15.0625 10.2265 13.7252 9.79927 12.35 9.77L13 6.65L15.138 7.1C15.1931 7.60706 15.621 7.99141 16.131 7.992C16.1674 7.99196 16.2038 7.98995 16.24 7.986C16.7702 7.93278 17.1655 7.47314 17.1389 6.94094C17.1122 6.40873 16.6729 5.991 16.14 5.991C16.1022 5.99191 16.0645 5.99491 16.027 6C15.71 6.03367 15.4281 6.21641 15.268 6.492L12.82 6C12.7983 5.99535 12.7762 5.993 12.754 5.993C12.6094 5.99472 12.4851 6.09583 12.454 6.237L11.706 9.71C10.3138 9.7297 8.95795 10.157 7.806 10.939C7.53601 10.6839 7.17843 10.5422 6.807 10.543ZM12.18 16.524C12.124 16.524 12.067 16.524 12.011 16.524C11.955 16.524 11.898 16.524 11.842 16.524C11.0121 16.5208 10.2054 16.2497 9.542 15.751C9.49626 15.6958 9.47445 15.6246 9.4814 15.5533C9.48834 15.482 9.52348 15.4163 9.579 15.371C9.62737 15.3318 9.68771 15.3102 9.75 15.31C9.81233 15.31 9.87275 15.3315 9.921 15.371C10.4816 15.7818 11.159 16.0022 11.854 16C11.9027 16 11.9513 16 12 16C12.059 16 12.119 16 12.178 16C12.864 16.0011 13.5329 15.7863 14.09 15.386C14.1427 15.3322 14.2147 15.302 14.29 15.302C14.3653 15.302 14.4373 15.3322 14.49 15.386C14.5985 15.4981 14.5962 15.6767 14.485 15.786V15.746C13.8213 16.2481 13.0123 16.5208 12.18 16.523V16.524ZM14.307 14.08H14.291L14.299 14.041C13.8591 14.011 13.4994 13.6789 13.4343 13.2429C13.3691 12.8068 13.6162 12.3842 14.028 12.2269C14.4399 12.0697 14.9058 12.2202 15.1478 12.5887C15.3899 12.9572 15.3429 13.4445 15.035 13.76C14.856 13.9554 14.6059 14.0707 14.341 14.08H14.306H14.307ZM9.67 14C9.11772 14 8.67 13.5523 8.67 13C8.67 12.4477 9.11772 12 9.67 12C10.2223 12 10.67 12.4477 10.67 13C10.67 13.5523 10.2223 14 9.67 14Z">
                                </path>
                            </svg>
                        </a>
                    
                        <a href="#"
                            class="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                            aria-label="Facebook">
                            <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M2.00195 12.002C2.00312 16.9214 5.58036 21.1101 10.439 21.881V14.892H7.90195V12.002H10.442V9.80204C10.3284 8.75958 10.6845 7.72064 11.4136 6.96698C12.1427 6.21332 13.1693 5.82306 14.215 5.90204C14.9655 5.91417 15.7141 5.98101 16.455 6.10205V8.56104H15.191C14.7558 8.50405 14.3183 8.64777 14.0017 8.95171C13.6851 9.25566 13.5237 9.68693 13.563 10.124V12.002H16.334L15.891 14.893H13.563V21.881C18.8174 21.0506 22.502 16.2518 21.9475 10.9611C21.3929 5.67041 16.7932 1.73997 11.4808 2.01722C6.16831 2.29447 2.0028 6.68235 2.00195 12.002Z">
                                </path>
                            </svg>
                        </a>
                    
                        <a href="#"
                            class="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                            aria-label="Github">
                            <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M12.026 2C7.13295 1.99937 2.96183 5.54799 2.17842 10.3779C1.395 15.2079 4.23061 19.893 8.87302 21.439C9.37302 21.529 9.55202 21.222 9.55202 20.958C9.55202 20.721 9.54402 20.093 9.54102 19.258C6.76602 19.858 6.18002 17.92 6.18002 17.92C5.99733 17.317 5.60459 16.7993 5.07302 16.461C4.17302 15.842 5.14202 15.856 5.14202 15.856C5.78269 15.9438 6.34657 16.3235 6.66902 16.884C6.94195 17.3803 7.40177 17.747 7.94632 17.9026C8.49087 18.0583 9.07503 17.99 9.56902 17.713C9.61544 17.207 9.84055 16.7341 10.204 16.379C7.99002 16.128 5.66202 15.272 5.66202 11.449C5.64973 10.4602 6.01691 9.5043 6.68802 8.778C6.38437 7.91731 6.42013 6.97325 6.78802 6.138C6.78802 6.138 7.62502 5.869 9.53002 7.159C11.1639 6.71101 12.8882 6.71101 14.522 7.159C16.428 5.868 17.264 6.138 17.264 6.138C17.6336 6.97286 17.6694 7.91757 17.364 8.778C18.0376 9.50423 18.4045 10.4626 18.388 11.453C18.388 15.286 16.058 16.128 13.836 16.375C14.3153 16.8651 14.5612 17.5373 14.511 18.221C14.511 19.555 14.499 20.631 14.499 20.958C14.499 21.225 14.677 21.535 15.186 21.437C19.8265 19.8884 22.6591 15.203 21.874 10.3743C21.089 5.54565 16.9181 1.99888 12.026 2Z">
                                </path>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <p class="text-center text-gray-500 dark:text-gray-400">© Brand 2020 - All rights reserved</p>
        </div>
    </div>
</footer>
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
  </div>
  </>
  );
}

export default Dashboard
