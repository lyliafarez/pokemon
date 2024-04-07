import React, { useState,useEffect } from "react";
import CharaWindow from "./CharaWindow"

function Card({ pokemon, addToFavorites ,deleteFromFavourite}) {
  //const [isFavorite, setIsFavorite] = useState(false);
  const [item, setPokemon] = useState(pokemon);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function getTypeColor(typeName) {
    const typeColors = {
      normal: '#A8A77A',
      fire: '#EE8130',
      water: '#6390F0',
      electric: '#F7D02C',
      grass: '#7AC74C',
      ice: '#96D9D6',
      fighting: '#C22E28',
      poison: '#A33EA1',
      ground: '#E2BF65',
      flying: '#A98FF3',
      psychic: '#F95587',
      bug: '#A6B91A',
      rock: '#B6A136',
      ghost: '#735797',
      dragon: '#6F35FC',
      dark: '#705746',
      steel: '#B7B7CE',
      fairy: '#D685AD'
    };

    // Check if the typeName exists in the typeColors object
    // If it does, return the corresponding color; otherwise, return a default color
    return typeColors[typeName.toLowerCase()] || '#000000'; // Default color: black
  }
  function displayPokemonTypes(pokemon) {
    return pokemon.types.map((type, index) => {
      const typeName = type.type.name;
      const bgColor = getTypeColor(typeName);
      return (
        <span
          key={index}
          className="px-2 rounded-md text-white font-semibold mr-2"
          style={{ backgroundColor: bgColor }}
        >
          {typeName}
        </span>
      );
    });
  }
  const handleOpenModal = () => {
    if (!event.target.closest('button')) {
      // If the click did not originate from a button, open the modal
      setIsModalOpen(true);
    }
    
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  useEffect(()=>{
    setPokemon(pokemon)
  },[pokemon])
  const toggleFavorite = () => {
    if(pokemon.selected == false){
    pokemon.selected = true
    addToFavorites(pokemon);}
    else{
      pokemon.selected = false
      deleteFromFavourite(pokemon)
     
    }
  };
  
  return (
    <div className={"relative flex rounded-md p-3 flex-col items-center border border-4 bg-white"}  style={{borderColor:getTypeColor(pokemon.types[0].type.name), boxShadow: '3px 3px 3px gray'}} onClick={handleOpenModal}>
      <div className="absolute top-0 right-0 mt-2 mr-2">
        <button onClick={toggleFavorite}>
          {pokemon.selected ? "❤️" : "🤍"}
        </button>
      </div>

      <div className="flex flex-col items-center">
        <div className="rounded-md flex justify-center items-center">
          <img src={pokemon.sprites.other['official-artwork'].front_default} className="h-32 w-32" alt={pokemon.name} />
        </div>
        <span className="font-bold capitalize" >{pokemon.name}</span>
      <div className="flex flex-row gap-1 justify-center items-center">
      {displayPokemonTypes(pokemon)}
      </div>
      {isModalOpen && <CharaWindow closeModal={handleCloseModal} pokemon={pokemon} getTypeColor={getTypeColor} displayPokemonTypes={displayPokemonTypes}/>}
    </div>
    </div>
  );
}

export default Card;