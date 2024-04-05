import React, { useEffect, useState } from "react";
import Card from "./Card";

function List({ pokemons }) {
  const [pokemonsList, setPokemonsList] = useState(pokemons);
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("favorites")) || [];
  });

  useEffect(() => {
    setPokemonsList(pokemons);
  }, [pokemons]);

  useEffect(() => {
   
      localStorage.setItem("favorites", JSON.stringify(favorites));
    
  }, [favorites]);

  const addToFavorites = (pokemon) => {
    const isFavorite = favorites.find((favPokemon) => favPokemon.id === pokemon.id);
    
    if (isFavorite) {
      const updatedFavorites = favorites.filter((favPokemon) => favPokemon.id !== pokemon.id);
      setFavorites(updatedFavorites);
    } else {
      setFavorites([...favorites, pokemon]);
    }
  };

  const deleteFromFavourite = (pokemon)=>{
    let list = favorites.filter((favPokemon)=>favPokemon.id !== pokemon.id)
    setFavorites(list)
  }



  return (
    <div>
      <div className="grid grid-cols-4 gap-4">
        {pokemonsList.map((item, index) => (
          <Card
            key={index}
            pokemon={item}
            addToFavorites={addToFavorites}
            deleteFromFavourite={deleteFromFavourite}
          />
        ))}
      </div>
    </div>
  );
}

export default List;
