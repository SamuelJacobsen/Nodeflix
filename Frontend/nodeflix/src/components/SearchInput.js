import React from 'react';

const SearchInput = ({ handleSearch }) => {
  const handleChange = (e) => {
    const searchTerm = e.target.value;
    handleSearch(searchTerm);
  };

  return (
    <div className="input-group mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Pesquisar filmes..."
        onChange={handleChange}
      />
      <div className="input-group-append">
        <button className="btn btn-outline-secondary" type="button">
          Pesquisar
        </button>
      </div>
    </div>
  );
};

export default SearchInput;
