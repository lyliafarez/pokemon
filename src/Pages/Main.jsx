//import React from "react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import List from "../Components/List";
import Pagination from "../Components/Pagination";

function Main() {
  const [pokemonData, setPokemonData] = useState([]);

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

  /* Load first time all data */
  useEffect(() => {
    async function getData() {
      let currentOffset = 0;
      const limit = 50;
      let totalItems = 0;
      let pokemonData = [];
      //setLoading(true)
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

    getData();
  }, []);

  const loadPokemon = async (url) => {
    let res = await axios.get(url);
    return {...res.data,selected:false};
  };

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
      let list = pokemonData.filter((pokemon) =>
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

  return (
    <div className="mt-20 flex flex-col">
      {/* search bar and title */}
      <div>
        <div className="flex flex-row justify-between items-center mx-4">
          {/* Title */}
          <span className="font-serif text-font-bold text-4xl text-pink-200">
            Liste des pokemons
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
            <input
              type="text"
              placeholder="search a pokemon"
              className="rounded-md px-2 w-1/2"
            />
            <select name="pets" id="pet-select">
              <option value="">--Please choose an option--</option>
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
              <option value="hamster">Hamster</option>
              <option value="parrot">Parrot</option>
              <option value="spider">Spider</option>
              <option value="goldfish">Goldfish</option>
            </select>
          </div>
        </div>
      </div>
      <div className="mx-4 mt-8">
        <List pokemons={currentItems} key={currentItems} />
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
        />
      </div>
    </div>
  );
}

export default Main;
