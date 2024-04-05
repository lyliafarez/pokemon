import React, { useEffect, useState } from "react";
import List from "../Components/List";

function Favourite({ removeFromFavorites }) {
    const [favorites, setFavorites] = useState([]);
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  return (
    <div>
      <h2>Mes Favoris</h2>
      <List pokemons={favorites} removeFromFavorites={removeFromFavorites} />
    </div>
  );
}

export default Favourite;