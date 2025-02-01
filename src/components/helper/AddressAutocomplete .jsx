import { useState, useEffect } from 'react';
import axios from 'axios';
import { Input } from '../ui/input';


const AddressAutocomplete = ({ onPlaceSelected }) => {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);


  const fetchSuggestions = async (searchQuery) => {
    if (searchQuery.length < 3) {
      setSuggestions([]);
      return;
    }


    try {
      const response = await axios.get(
        `https://maps.gomaps.pro/maps/api/place/queryautocomplete/json?`,
        {
          params: {
            key: import.meta.env.VITE_GOPRO_API_KEY, // Replace with your GoMaps.pro API Key
            input: searchQuery,
          },
        }
      );
      console.log(response);
      setSuggestions(response.data.predictions || []);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    } 
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
    fetchSuggestions(value);
  };

  const handleSuggestionClick = (name,suggestion) => {
    setInput(suggestion.description);
    setSuggestions([]);
    if (onPlaceSelected) {
      onPlaceSelected(name,suggestion);
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <Input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Enter a location"
        style={{ width: '100%', padding: '10px', fontSize: '16px',color:'Black',}}
      />
      
      {suggestions.length > 0 && (
        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            border: '1px solid #ccc',
            borderRadius: '4px',
            maxHeight: '200px',
            overflowY: 'auto',
            backgroundColor: '#fff',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            position: 'absolute',
            width: '100%',
            zIndex: 1000,
          }}
        >
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick('location',suggestion)}
              style={{
                padding: '10px',
                cursor: 'pointer',
                borderBottom: '1px solid #eee',
              }}
            >
              {suggestion.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  // Rest of the component code...
};

export default AddressAutocomplete;