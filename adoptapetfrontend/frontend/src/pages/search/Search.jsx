import React, { useState, useEffect } from 'react';
import { searchListingsApi } from '../../apis/Api'; // Adjust the import path as needed
import { debounce } from 'lodash';
import { Search, Filter } from 'lucide-react';

const SearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    petType: '',
    gender: '',
    size: ''
  });
  const [showFilters, setShowFilters] = useState(false);
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await searchListingsApi({
        q: searchQuery,
        ...filters
      });
      console.log('API Response:', response);
      
      if (response.data.success) {
        setListings(response.data.listings);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError('An error occurred while searching. Please try again.');
      console.error('Error during search:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const debouncedSearch = debounce(handleSearch, 300);

  useEffect(() => {
    debouncedSearch();
    return () => debouncedSearch.cancel();
  }, [searchQuery, filters]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="search-container p-4">
      <div className="relative">
        <input
          type="text"
          placeholder="Search pets..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input p-2 pr-20 border rounded w-full"
        />
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2"
        >
          <Filter size={20} />
        </button>
      </div>

      {showFilters && (
        <div className="filter-options mt-2 p-4 bg-gray-100 rounded">
          <select
            value={filters.petType}
            onChange={(e) => handleFilterChange('petType', e.target.value)}
            className="filter-select p-2 border rounded mr-2 mb-2"
          >
            <option value="">All Pet Types</option>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
            <option value="bird">Bird</option>
            {/* Add more pet types as needed */}
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
            <option value="large">Large</option>
          </select>
        </div>
      )}

      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="listings-container mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {listings.map((listing) => (
          <div key={listing._id} className="listing-item bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold">{listing.petType}</h3>
            <p>Breed: {listing.breed}</p>
            <p>Gender: {listing.gender}</p>
            <p>Size: {listing.size}</p>
            {/* Add more details as needed */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchComponent;