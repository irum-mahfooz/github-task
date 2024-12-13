import React, { useState } from 'react';
import './App.css';
import githubLogo from './icons8-github-48.png'; // Import the logo

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("users"); // Default to 'users'
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Handle search input change
  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    if (term.length >= 3) {
      fetchResults(term, searchType);
    } else {
      setResults([]); // Clear results if less than 3 characters
    }
  };

  // Handle search type change
  const handleTypeChange = (event) => {
    setSearchType(event.target.value.toLowerCase());
    if (searchTerm.length >= 3) {
      fetchResults(searchTerm, event.target.value.toLowerCase());
    }
  };

  // Fetch results from GitHub API
  const fetchResults = async (term, type) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.github.com/search/${type}?q=${term}`
      );
      const data = await response.json();
      setResults(data.items || []); // Set results (items array from API response)
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Render blank cards only if the search term has 3 or more characters
  const renderCards = () => {
    if (searchTerm.length < 3) {
      return null; // Don't display anything if search term is less than 3 characters
    }
    return Array(9)
      .fill(null)
      .map((_, index) => <div className="card" key={index}></div>);
  };

  return (
    <div className="github-searcher">
      <div className="header">
        <img src={githubLogo} alt="GitHub Logo" className="github-logo" />
        <div className="header-text">
          <h1>GitHub Searcher</h1>
          <p>Search users or repositories below</p>
        </div>
      </div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Start typing to search .."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
        <select
          value={searchType}
          onChange={handleTypeChange}
          className="search-select"
        >
          <option value="users">Users</option>
          <option value="repositories">Repositories</option>
        </select>
      </div>
      <div className="results-container">{renderCards()}</div>
    </div>
  );
};

export default App;
