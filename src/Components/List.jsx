import React, { useEffect, useState } from "react";
import Card from "./Card";


function List({ pokemons }) {
  const [pokemonsList, setPokemonsList] = useState(pokemons);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setPokemonsList(pokemons);
  }, [pokemons]);

  useEffect(() => {
    if(favorites.length > 0){
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
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

  const logFavorites = () => {
    console.log("Favoris:", favorites);
  };

  return (
    <div>
      <div className="grid grid-cols-4 gap-4">
        {pokemonsList.map((item, index) => (
          <Card
            key={index}
            pokemon={item}
            addToFavorites={addToFavorites}
          />
        ))}
      </div>
      <button onClick={logFavorites}>Afficher les favoris</button>
    </div>
  );
}

export default List;
>>>>>>> 041842d6743e5e278dd3d49f021f8963a3f82bd7
