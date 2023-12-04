import React, { useState } from 'react';

const SearchInput = ({ handleSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Pesquisar filmes..."
          value={searchTerm}
          onChange={handleChange}
        />
        <div className="input-group-append">
          <button className="btn btn-outline-secondary" type="submit">Pesquisar</button>
        </div>
      </div>
    </form>
  );
};

export default SearchInput;
