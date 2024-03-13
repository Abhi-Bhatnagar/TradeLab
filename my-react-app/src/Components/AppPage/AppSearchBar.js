import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Tickers from '../Tickers.json'; // Import JSON file with stock data

function SearchBar() {
  const [inputValue, setInputValue] = useState('');
  const [isClicked, setIsClicked] = useState(false); // Track if search box is clicked
  const [suggestions, setSuggestions] = useState([]);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      console.log('Entered value:', inputValue);
      if (suggestions.length > 0) {
        const selectedSuggestion = suggestions[0];
        setInputValue(selectedSuggestion.title);
        handleSearch(selectedSuggestion.title);
      } else {
        if (!isValueInSuggestions(inputValue)) {
          alert('No suggestions found for the entered value.');
        } else {
          let query = inputValue;
          const ticker = findTickerByCompanyName(inputValue);
          if (ticker) {
            query = ticker;
          }
          const url = `/app-search-results?query=${encodeURIComponent(query)}`;
          window.location.href = url;
        }
      }
    }
  };

  // Function to filter stock suggestions based on input value
  const filterStocks = (input) => {
    const inputLowerCase = input.toLowerCase();
    return Object.values(Tickers).filter(stock =>
      stock.title.toLowerCase().includes(inputLowerCase) || stock.ticker.toLowerCase().includes(inputLowerCase)
    );
  };

  const findTickerByCompanyName = (companyName) => {
    const company = Object.values(Tickers).find(stock =>
      stock.title.toLowerCase() === companyName.toLowerCase()
    );
    return company ? company.ticker : null;
  };

  const isValueInSuggestions = (value) => {
    return suggestions.some(suggestion => suggestion.title.toLowerCase() === value.toLowerCase());
  };

  useEffect(() => {
    // Filter stock suggestions based on current input value
    setSuggestions(filterStocks(inputValue));
  }, [inputValue]);

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion.title);
    setIsClicked(false); // Close suggestions dropdown when suggestion is clicked
    handleSearch(suggestion.title);
  };

  const handleClickOutside = (event) => {
    if (!event.target.closest('.input-group')) {
      setIsClicked(false); // Close suggestions dropdown when clicked outside
    }
  };

  const handleSearch = (query) => {
    const ticker = findTickerByCompanyName(query);
    const searchQuery = ticker ? ticker : query;
    const url = `/app-search-results?query=${encodeURIComponent(searchQuery)}`; // Different route for app search results
    window.location.href = url;
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const searchStyle = {
    border: '2px solid transparent',
    borderWidth: '3px',
    //borderImageSlice: '1',
    //borderImageSource: 'linear-gradient(to left, #743ad5, #d53a9d)',
    //borderBlockColor: 'red',
    borderRadius: '20px',
    background: 'linear-gradient(#131722, #131722) padding-box, linear-gradient(to bottom right, #00C7F9, #DC55FF) border-box', // Black background
    color: '#ffffff', // White text
    flex: '1', // Take remaining space
    outline: 'none', // Remove outline
    padding: '8px 12px', // Adjust padding
    fontSize: '16px', // Adjust font size
    boxShadow: '0 5px 15px linear-gradient(to bottom right, #00C7F9, #DC55FF)',
  };

  const dropdownMenuStyle = {
    display: 'block',
    position: 'absolute',
    width: '30vw', // Width same as the input field
    marginTop: '45px', // Distance from the input field
    backgroundColor: '#131722', // Black background
    color: '#ffffff', // White text
    padding: '10px', // Adjust padding
    borderRadius: '8px', // Rounded corners
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)', // Box shadow
    
  };

  return (
    <form className="d-flex">
      <div className="input-group" style={{width: '30vw', height: '3vh', display: 'flex', color: 'white' }} onClick={() => setIsClicked(true)}>
        <input
          type="text"
          className='glow'
          placeholder="Search stocks"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          style={searchStyle}
          onMouseOver={() => {
            const inputElement = document.querySelector('.glow');
            inputElement.style.boxShadow = '0 5px 15px rgba(145, 92, 182, .6)';
          }}
          onMouseOut={() => {
            const inputElement = document.querySelector('.glow');
            inputElement.style.boxShadow = 'none';
          }}
        />
      </div>
      {(isClicked || inputValue) && suggestions.length > 0 && (
        <ul className="menu" style={dropdownMenuStyle}>
          {suggestions.slice(0, 5).map((suggestion, index) => (
            <li key={index} className="dropdown-item" onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion.title}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}

export default SearchBar;
