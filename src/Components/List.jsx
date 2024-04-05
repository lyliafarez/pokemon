import { useEffect, useState } from "react"
import Card from "./Card"

function List({pokemons}) {
  const [pokemonsList, setPokemonsList] = useState(pokemons)
  const [isSelected, setIsSelected] = useState(false);

  useEffect(()=>{
    setPokemonsList(pokemons)
  },[pokemons])

  function handleDelete(name) {
    const newPokemonList = pokemonsList.filter(pokemon => pokemon.name !== name);
    setPokemonsList(newPokemonList);
  }

  function handleSelectAll() {
    const updatedPokemonList = pokemonsList.map(pokemon => ({
      ...pokemon,
      selected: true
    }));
    setPokemonsList(updatedPokemonList);
    setIsSelected(true);
  }

  function handleDeleteAll() {
    const newPokemonList = pokemonsList.filter(pokemon => !pokemon.selected);
    setPokemonsList(newPokemonList);
    setIsSelected(false);
  }

  return (
    <>    
    <div>
      <button onClick={handleSelectAll}>Sélectionner tout</button>
      {isSelected && <button onClick={handleDeleteAll}>Supprimer tout</button>}
      <div className="grid grid-rows-4 grid-flow-col gap-4">
        {pokemonsList.map((pokemon, index) => (
          <Card key={index} pokemon={pokemon} list={pokemonsList} onDelete={handleDelete} />
        ))}
      </div>
    </div>
    </>
  )
}
  
export default List