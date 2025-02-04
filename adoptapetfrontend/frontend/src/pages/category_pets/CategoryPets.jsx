import React,{useState,useEffect} from 'react'
import { pagination } from '../../apis/Api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import '../all_pets/all_pets.css'
import Navbar from '../../components/Navbar';
import { searchListingsApi } from '../../apis/Api';
import { debounce } from 'lodash';
import { Search, Filter } from 'lucide-react';

const CategoryPets = () => {
    const navigate = useNavigate();
    const [pets, setPets] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({
      petType: '',
      gender: '',
      size: ''
    });
    const [showFilters, setShowFilters] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
  
    const fetchPets = async () => {
      setIsLoading(true);
      try {
        const response = await pagination(pageNumber);
        console.log('API response:', response.data);
        if (response.data && Array.isArray(response.data.listings)) {
          setPets(response.data.listings);
        } else {
          console.error('Expected an array but got:', response.data);
          toast.error('Unexpected response format from server.');
        }
      } catch (error) {
        toast.error("Failed to fetch pet data");
        console.error("There was an error fetching the pet data!", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    const handleSearch = async () => {
      setIsLoading(true);
      try {
        const response = await searchListingsApi({
          q: searchQuery,
          ...filters
        });
        console.log('Search API Response:', response.data);
        if (response.data.success) {
          setPets(response.data.listings);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error('An error occurred while searching. Please try again.');
        console.error('Error during search:', error);
      } finally {
        setIsLoading(false);
      }
    };
  
    const debouncedSearch = debounce(handleSearch, 300);
  
    useEffect(() => {
      if (searchQuery === '' && Object.values(filters).every(x => x === '')) {
        fetchPets();
      } else {
        debouncedSearch();
      }
      return () => debouncedSearch.cancel();
    }, [searchQuery, filters, pageNumber]);
  
    const handleFilterChange = (key, value) => {
      setFilters(prev => ({ ...prev, [key]: value }));
    };
  
    return (
      <>
        <Navbar />
        <div className='allpets-body p-4'>
          <div className="search-container mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search pets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input p-2 pr-20 border rounded w-full bg-[#AC8968]"
              />
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-[#AC8968]"
              >
                <Filter size={20} />
              </button>
            </div>
  
            {showFilters && (
              <div className="filter-options mt-2 p-4 bg-gray-100 rounded bg-[#AC8968]">
                <select
                  value={filters.petType}
                  onChange={(e) => handleFilterChange('petType', e.target.value)}
                  className="filter-select p-2 border rounded mr-2 mb-2"
                >
                  <option value="">All Pet Types</option>
                  <option value="dog">Dog</option>
                  <option value="cat">Cat</option>
                </select>
  
                <select
                  value={filters.gender}
                  onChange={(e) => handleFilterChange('gender', e.target.value)}
                  className="filter-select p-2 border rounded mr-2 mb-2"
                >
                  <option value="">All Genders</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
  
                <select
                  value={filters.size}
                  onChange={(e) => handleFilterChange('size', e.target.value)}
                  className="filter-select p-2 border rounded mr-2 mb-2"
                >
                  <option value="">All Sizes</option>
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="big">Large</option>
                </select>
              </div>
            )}
          </div>
  
          <h2 className='heading'>All Pets</h2>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <div className="row row-cols-1 row-cols-md-4 g-4 mt-4">
              {pets.map(pet => (
                <div key={pet._id} className="col mb-4">
                  <div className="card h-100 custom-card">
                    <img src={`https://localhost:5500/listings/${pet.petImage}`} className="card-img-top custom-card-img" alt={pet.petName} />
                    <div className="card-body">
                      <h5 className="card-title">{pet.petName}</h5>
                      <p className="card-text">{pet.petType}</p>
                      <Link to={`/pet_details/${pet._id}`} className="btn btn-custom">Browse Now</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="join mt-4">
            <button className="join-item btn" onClick={() => setPageNumber(prev => Math.max(prev - 1, 1))}>«</button>
            <button className="join-item btn">Page {pageNumber}</button>
            <button className="join-item btn" onClick={() => setPageNumber(prev => prev + 1)}>»</button>
          </div>
        </div>
      </>
    );
}

export default CategoryPets
