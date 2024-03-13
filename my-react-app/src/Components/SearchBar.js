import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Tickers from './Tickers.json'; // Import JSON file with stock data

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
          const url = `/search-results?query=${encodeURIComponent(query)}`;
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
    const url = `/search-results?query=${encodeURIComponent(searchQuery)}`;
    window.location.href = url;
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <form className="d-flex">
      <div className="input-group" style={{ paddingLeft: '20px', width: '50vh', display: 'flex'}} onClick={() => setIsClicked(true)}>
        <input
          type="text"
          className="form-control"
          placeholder="Search stocks"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <FontAwesomeIcon icon={faSearch} style={{ position: 'absolute', transform: 'translate(1100%, 60%)' }} />
      </div>
      {(isClicked || inputValue) && suggestions.length > 0 && (
        <ul className="dropdown-menu" style={{ display: 'block', position: 'absolute', width: '20%', marginTop: '38px' }}>
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
