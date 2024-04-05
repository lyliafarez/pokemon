import React, { useEffect, useState } from "react";
import List from "../Components/List";
// import Card from "../Components/Card";

function Favourite({ removeFromFavorites }) {
    const [favorites, setFavorites] = useState([]);
    const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  function handleSelectAll() {
    const updatedPokemonList = favorites.map(pokemon => ({
      ...pokemon,
      selected: true
    }));
    setFavorites(updatedPokemonList);
    setIsSelected(true);
  }

  function handleDeleteAll() {
    const newPokemonList = favorites.filter(pokemon => !pokemon.selected);
    setFavorites(newPokemonList);
    setIsSelected(false);
  }


  return (
    <div>
      <h2>Mes Favoris</h2>
      <List pokemons={favorites} removeFromFavorites={removeFromFavorites} />
       <button onClick={handleSelectAll}>Sélectionner tout</button>
       {isSelected && <button onClick={handleDeleteAll}>Supprimer tout</button>}
        {/* {favorites.map((pokemon, index) => (
        <Card key={index} pokemon={pokemon} list={favorites} />
        ))} */}
    </div>
  );
}

export default Favourite;