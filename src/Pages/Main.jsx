import React, { useState, useEffect } from "react";
import axios from "axios";
import List from "../Components/List";
import Pagination from "../Components/Pagination";

function Main() {
  const [pokemonData, setPokemonData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [totalPages, setTotalPages] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPokemons.slice(indexOfFirstItem, indexOfLastItem);
  const [pokemonTypes, setPokemonTypes] = useState([]);
  const types_url = "https://pokeapi.co/api/v2/type"
  /* Load first time all data */
  useEffect(() => {
    async function getData() {
      let currentOffset = 0;
      const limit = 100;
      let totalItems = 0;
      let pokemonData = [];
      while (true) {
        try {
          const res = await axios.get(
            `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${currentOffset}`
          );
          const list = res.data.results;
          const _data = await Promise.all(
            list.map(async (pokemon) => {
              const pokemonGet = await loadPokemon(pokemon.url);
              return pokemonGet;
            })
          );

          pokemonData = [...pokemonData, ..._data];
          setFilteredPokemons(pokemonData);
          totalItems = res.data.count;
          setTotalPages(Math.ceil(totalItems / itemsPerPage));

           // Check if we've fetched all the data
          if (pokemonData.length >= totalItems) {
            break;
          }

          // Update the offset for the next request
          currentOffset += limit;
        } catch (error) {
          console.error("Error fetching data:", error);
          break;
        }
      }

      setTotalPages(Math.ceil(totalItems / itemsPerPage));
      setPokemonData(pokemonData);
      setFilteredPokemons(pokemonData);
    }

    loadPokemonTypes(types_url)
    getData();
    
  }, []);

  const loadPokemon = async (url) => {
    let res = await axios.get(url);
    let favs = JSON.parse(localStorage.getItem("favorites")) || [];
    const isPokemonInList = favs.some(pokemon => pokemon.name === res.data.name);
    return {...res.data, selected: isPokemonInList};
  };

  const loadPokemonTypes = async (url)=>{
    let res = await axios.get(url)
    let types = res.data.results.map((type)=> type.name)
    setPokemonTypes(types)

  }

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
      let list = filteredPokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredPokemons(list);
      const totalItems = list.length;
      setTotalPages(Math.ceil(totalItems / itemsPerPage));
    } else {
      setFilteredPokemons(pokemonData);
      const totalItems = pokemonData.length;
      setTotalPages(Math.ceil(totalItems / itemsPerPage));
    }

    setCurrentPage(1);
  };

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    if (category === "") {
      setFilteredPokemons(pokemonData);
      let totalItems = pokemonData.length;
      setTotalPages(Math.ceil(totalItems / itemsPerPage));
    } else {
      const list = filteredPokemons.filter((pokemon) =>
      pokemon.types.some(type => type.type.name === category)
      );
      setFilteredPokemons(list);
      let totalItems = list.length;
      setTotalPages(Math.ceil(totalItems / itemsPerPage));
    }
    setCurrentPage(1);
  };

  return (
    <div className="mt-10 flex flex-col">
      {/* search bar and title */}
      <div>
        <div className="flex flex-row justify-between items-center mx-4">
          {/* Title */}
          <span className="font-anton text-font-bold text-5xl  text-gray">
            POKEMON LIST
          </span>
          {/* Search bar */}
          <div className="flex flex-row justify-between gap-2 items-center">
            <input
              value={searchInput}
              type="text"
              placeholder="search a pokemon"
              className="rounded-md px-2 py-2 w-80 border border-black"
              onChange={handleSearchInput}
            />
            <select
              name="category"
              id="category-select"
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="py-2 border border-black rounded-md"
            >
              <option value="">-- Choose a category --</option>
              {pokemonTypes.map((type,index)=>{
                return(<option value={type} key={index} >{type}</option>)
              })}
             
              {/* <option value="grass">Grass</option>
              <option value="fire">Fire</option>
              <option value="water">Water</option> */}
            </select>
          </div>
        </div>
      </div>
      <div className="mx-4 mt-8 bg-white p-12">
        <List pokemons={currentItems} key={currentItems} isMain={true} />
      </div>
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
          itemPerPage={itemsPerPage}
        />
      </div>
    </div>
  );
}

export default Main;
