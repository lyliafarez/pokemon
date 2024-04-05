//import React from "react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import List from "../Components/List";
import Pagination from "../Components/Pagination";

function Main() {
  const [pokemonData, setPokemonData] = useState([]);

  const [currentPageUrl, setCurrentPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );
  const [nextPageUrl, setNextPageUrl] = useState();
  const [prevPageUrl, setPrevPageUrl] = useState();

  useEffect(() => {
    async function getData() {
      let res = await axios.get(currentPageUrl);
      let list = res.data.results;
      setNextPageUrl(res.data.next);
      setPrevPageUrl(res.data.previous);
      console.log(res.data)
      let _data = await Promise.all(
        list.map(async (pokemon) => {
          // "https://pokeapi.co/api/v2/pokemon/23/"
          let pokemonGet = await loadPokemon(pokemon.url);
          return pokemonGet;
        })
      );
      setPokemonData(_data);
    }

    getData();
  }, [currentPageUrl]);

  const loadPokemon = async (url) => {
    let res = await axios.get(url);
    return res.data;
  };

  function gotoNextPage() {
    setCurrentPageUrl(nextPageUrl);
  }

  function gotoPrevPage() {
    setCurrentPageUrl(prevPageUrl);
  }


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
              type="text"
              placeholder="search a pokemon"
              className="rounded-md px-2 w-full"
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
        <List pokemons={pokemonData} key={pokemonData}/>
        
      </div>
      <div className="mt-6">
      <Pagination
        gotoNextPage={nextPageUrl ? gotoNextPage : null}
        gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
      />
      </div>
      

      {/*  {
    pokemonData.map((item,index)=>{
        return (
          <div  key={index}>
             <li>{item.name}</li>
             <img src={item.sprites.front_default}/>
          </div>
           
        )
    })
   } */}
    </div>
  );
}

export default Main;
