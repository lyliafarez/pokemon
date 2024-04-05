import React, { useState } from "react";

function Card({ pokemon, addToFavorites ,deleteFromFavourite}) {
  //const [isFavorite, setIsFavorite] = useState(false);

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
    <div className="relative flex flex-col items-center bg-white rounded-md px-2 py-2">
      <div className="absolute top-0 right-0 mt-2 mr-2">
        <button onClick={toggleFavorite}>
          {pokemon.selected ? "❤️" : "🤍"}
        </button>
      </div>
      <div className="border border-1 border-white rounded-md flex justify-center items-center">
        <img src={pokemon.sprites.front_default} className="h-30 w-30" alt={pokemon.name} />
      </div>

      <div className="flex flex-row gap-1 justify-center items-center">
        <span className="px-2 bg-blue-200 rounded-md text-white font-semi-bold">{pokemon.types[0].type.name}</span>
        <span className="font-bold">{pokemon.name}</span>
      </div>
    </div>
  );
}

export default Card;