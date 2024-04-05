import React, { useEffect, useState } from "react";
import List from "../Components/List";
import Pagination from "../Components/Pagination";

function Favourite({ removeFromFavorites }) {
    const [favorites, setFavorites] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(20);
    const [totalPages, setTotalPages] = useState(1);
    const [searchInput, setSearchInput] = useState("");
    const [filteredPokemons, setFilteredPokemons] = useState([]);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredPokemons.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  /* Pagination */
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  function nextPage() {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  }

  function prevPage() {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  }

  function gotoPage(pageNumber) {
    setCurrentPage(pageNumber);
  }

  /* Search Input */
  const handleSearchInput = (event) => {
    let search = event.target.value;
    setSearchInput(search);
    if (search.length > 0) {
      let list = favorites.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredPokemons(list);
      const totalItems = list.length;
      setTotalPages(Math.ceil(totalItems / itemsPerPage));
    } else {
      setFilteredPokemons(favorites);
      const totalItems = favorites.length;
      setTotalPages(Math.ceil(totalItems / itemsPerPage));
    }

    setCurrentPage(1);
  };




  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
    setFilteredPokemons(storedFavorites)
    let totalItems = storedFavorites.count
    setTotalPages(Math.ceil(totalItems / itemsPerPage));
  }, []);

  useEffect(()=>{
    let totalItems = favorites.length
    setTotalPages(Math.ceil(totalItems / itemsPerPage));
  },[favorites])

  return (
    <div>
       <div>
        <div className="flex flex-row justify-between items-center mx-4">
          {/* Title */}
          <span className="font-serif text-font-bold text-4xl text-pink-200">
            Mes favoris
          </span>
          {/* Search bar */}
          <div className="flex flex-row justify-between gap-2 items-center">
            <input
              value={searchInput}
              type="text"
              placeholder="search a pokemon"
              className="rounded-md px-2 w-full"
              onChange={handleSearchInput}
            />
          </div>
        </div>
      </div>
      
      <List pokemons={currentItems} removeFromFavorites={removeFromFavorites} />
      <div className="mt-6">
        <Pagination
          paginatedData={currentItems}
          allData={filteredPokemons}
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
          nextPage={nextPage}
          prevPage={prevPage}
          gotoPage={gotoPage}
        />
      </div>
    </div>
  );
}

export default Favourite;