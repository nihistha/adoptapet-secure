import React,{ useState, useEffect } from 'react'
import './pet_details.css'
import pet from '../../assets/petphoto.png'
import { useParams } from 'react-router-dom';
import { getoneListing } from '../../apis/Api';
import {toast} from 'react-toastify'
import Navbar from '../../components/Navbar';
import { Link } from 'react-router-dom'
import { Dog, Ruler, Syringe, Info,Heart,User } from 'lucide-react';


const PetDetails = () => {

    const { id } = useParams();
    const [pet, setPet] = useState(null);

    useEffect(() => {
        const fetchPetDetails = async () => {
          try {
            const response = await getoneListing(id);
            setPet(response.data); // Assuming the response structure
          } catch (error) {
            console.error('Error fetching pet details:', error);
            
          }
        };
    
        fetchPetDetails();
      }, [id]);

      if (!pet) {
        return <div>Loading...</div>;
      }
  // return (
  //   <>
  //   <Navbar/>
  //    <div className='petdetails-body'>

  //   <div className='pet-card'>
  //       <div class="pet-info">
  //           <h1>{pet.petName}</h1>
  //           <div class="info">
  //               <p><span class="label">Breed:</span> {pet.breed}</p>
  //               <p><span class="label">Gender:</span> {pet.gender}</p>
  //               <p><span class="label">Size:</span> {pet.size}</p>
  //               <p><span class="label">Health:</span> Vaccinated</p>
  //           </div>
  //           <h2>About Me</h2>
  //           <p class="about-me">
  //           {pet.aboutPet}
  //           </p>
  //           <div class="adopt-button">
  //           <Link to={`/application/${pet._id}`} className="btn btn-custom" >Apply to Adopt</Link>
  //   </div>
  //       </div>
  //       <div class="pet-photo">
  //           <img src={`http://localhost:5500/listings/${pet.petImage}`} alt="Leah"/>
  //       </div>
  //   </div>

    
  //    </div>
  //   </>
  // )
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#AC8968] pt-20 pb-8 px-4 sm:px-6 lg:px-8"> {/* Added pt-20 for top padding */}
        <div className="max-w-4xl mx-auto bg-[#D2B48C] rounded-lg shadow-xl overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 p-4">
              <img 
                className="w-full h-64 object-cover rounded-lg" 
                src={`http://localhost:5500/listings/${pet.petImage}`} 
                alt={pet.petName} 
              />
            </div>
            <div className="md:w-1/2 p-8">
              <h1 className="text-3xl font-bold text-[#4A3728] mb-4">{pet.petName}</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center">
                  <Dog className="text-[#8B4513] mr-2" size={20} />
                  <span className="text-[#4A3728]">{pet.petType}</span>
                </div>
                <div className="flex items-center">
                  <Heart className="text-[#8B4513] mr-2" size={20} />
                  <span className="text-[#4A3728]">{pet.breed}</span>
                </div>
                <div className="flex items-center">
                  <User className="text-[#8B4513] mr-2" size={20} />
                  <span className="text-[#4A3728]">
                    {pet.gender} {pet.gender.toLowerCase() === 'male' ? '♂' : '♀'}
                  </span>
                </div>

                <div className="flex items-center">
                  <Ruler className="text-[#8B4513] mr-2" size={20} />
                  <span className="text-[#4A3728]">{pet.size}</span>
                </div>
                <div className="flex items-center">
                  <Syringe className="text-[#8B4513] mr-2" size={20} />
                  <span className="text-[#4A3728]">{pet.vaccination ? 'Vaccinated' : 'Not Vaccinated'}</span>
                </div>
              </div>
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-[#4A3728] mb-2 flex items-center">
                  <Info className="text-[#8B4513] mr-2" size={20} />
                  About {pet.petName}
                </h2>
                <p className="text-[#5D4037]">{pet.aboutPet}</p>
              </div>
    
               <Link to={`/application/${pet._id}`} className="btn btn-custom" >Apply to Adopt {pet.petName}</Link>
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PetDetails
