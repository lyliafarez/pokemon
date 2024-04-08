import React, { useEffect, useState } from "react";
import List from "../Components/List";
import Pagination from "../Components/Pagination";
import { Link } from 'react-router-dom';
import { PlusIcon } from '@heroicons/react/24/outline'
import pokemonImg4 from "../img/37701-7-pokemon-ash-transparent-image.png"
function Favourite({ removeFromFavorites }) {
    const [favorites, setFavorites] = useState(() => {
      return JSON.parse(localStorage.getItem("favorites")) || [];
    });
    const [isSelected, setIsSelected] = useState(false);
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

  function handleSelectAll() {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
    setFilteredPokemons(storedFavorites)
   /*  const updatedPokemonList = favorites.map(pokemon => ({
      ...pokemon,
      selected: true
    }));
    setFavorites(updatedPokemonList);
    setFilteredPokemons(updatedPokemonList) */
    isSelected === true ? setIsSelected(false) : setIsSelected(true)

    //setIsSelected(true);
  }

  function handleDeleteAll() {
    const updatedPokemonList = favorites.map(pokemon => ({
      ...pokemon,
      selected: true
    }));
    const newPokemonList = updatedPokemonList.filter(pokemon => !pokemon.selected);
    setFavorites(newPokemonList);
    setFilteredPokemons(newPokemonList)
    setIsSelected(false);
    localStorage.setItem('favorites', JSON.stringify([]));
  }

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
    <div className="my-10">
       <div>
        <div className="flex flex-row justify-between items-center mx-4 my-6">
          {/* Title */}
          <span className="font-anton text-font-bold text-4xl text-black">
            My favourites
          </span>
          {/* Search bar */}
          <div className="flex flex-row gap-2 items-center">
            <input
              value={searchInput}
              type="text"
              placeholder="search a pokemon"
              className="rounded-md px-2 py-2 w-80 border border-black"
              onChange={handleSearchInput}
            />
            <button className="px-2 py-2 text-white bg-yellow-500 font-semibold rounded-md hover:bg-yellow-300" onClick={handleSelectAll}>Select all</button>
            {isSelected && <button className="px-2 py-2 text-white bg-red-500 font-semibold rounded-md hover:bg-red-300" onClick={handleDeleteAll}>Delete all</button>}
          </div>
        </div>
      </div>
      
      <List pokemons={currentItems} key={currentItems} removeFromFavorites={removeFromFavorites} />
      
    <div className="mt-6 flex flex-col items-center justify-center">
      { favorites.length > 0 &&
         <Pagination
         paginatedData={currentItems}
         allData={filteredPokemons}
         currentPage={currentPage}
         totalPages={totalPages}
         handlePageChange={handlePageChange}
         nextPage={nextPage}
         prevPage={prevPage}
         gotoPage={gotoPage}
         itemPerPage={itemsPerPage}
       />
      }
      {
        favorites.length == 0 && 
        <div>
      <div className="flex flex-col justify-center items-center gap-4 fixed bottom-[60%] right-[40%] bg-white px-10 py-10 rounded-full font-bold font-poppins text-xl">
      <span> Wanna add a pokemon to your list ! click on the button down below</span>
      <Link to="/">
        <button className="flex flex-row  items-center px-2 py-2 bg-green-400 text-white font-semibold rounded-md hover:bg-green-300"> <PlusIcon className="w-4 h-5"/> Add a pokemon</button>
      </Link>
      </div>
      <div className="fixed bottom-0 right-0 -mr-[550px]">
      <img className="w-1/2 h-1/2" src={pokemonImg4}/>
      </div>
      </div>
      }
       
      </div>
     
      
    </div>
  );
}

export default Favourite;