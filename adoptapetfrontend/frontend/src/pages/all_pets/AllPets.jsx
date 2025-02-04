import React,{useState,useEffect} from 'react'
import { pagination } from '../../apis/Api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import './all_pets.css'
import Navbar from '../../components/Navbar';

const AllPets = () => {
  const navigate = useNavigate();
  const [pets, setPets] = useState([]);
  
  const [pageNumber,setPageNumber] = useState(1)

  useEffect(() => {
    // Fetch the pet data from the backend
    pagination(pageNumber)
      .then(response => {
        console.log('API response:', response.data);
        if (response.data && Array.isArray(response.data.listings)) {
          setPets(response.data.listings);
          console.log(setPets)
        }  else {
          console.error('Unexpected response format:', response.data);
          toast.error('Unexpected response format from server.');
        }
      })
      .catch(error => {
        console.error('Error fetching pets:', error);
        toast.error('Failed to fetch pets. Please try again later.');
      });
  }, [pageNumber]);


  return (
    <>
    <Navbar/>
    <div className='allpets-body'>
      <h2 className='heading'>All Pets</h2>
    <div className="row row-cols-1 row-cols-md-4 g-4 mt-4">
    {pets.map(pet => (
              <div key={pet._id} className="col mb-4">
                <div className="card h-100 custom-card">
                  <img src={`https://localhost:5500/listings/${pet.petImage}`} className="card-img-top custom-card-img" alt={pet.petName} />
                  <div className="card-body">
                    <h5 className="card-title">{pet.petName}</h5>
                    <p className="card-text">{pet.petType}</p>
                    <Link to={`/pet_details/${pet._id}`} className="btn btn-custom" >Browse Now</Link>
                  </div>
                </div>
              </div>
            ))}

    </div>
    <div class="join">
      <button class="join-item btn" onClick={()=>{setPageNumber(pageNumber-1)}}>«</button>
      <button class="join-item btn">Page {pageNumber}</button>
      <button class="join-item btn" onClick={()=>{setPageNumber(pageNumber+1)}}>»</button>
    </div>
    </div>
    </>
  )
}

export default AllPets
