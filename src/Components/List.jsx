import { useEffect, useState } from "react"
import Card from "./Card"

function List({pokemons}) {
  const [pokemonsList, setPokemonsList] = useState(pokemons)
  useEffect(()=>{
    setPokemonsList(pokemons)
  },[pokemons])
    return (
      <>
     <div className="grid grid-rows-4 grid-flow-col gap-4">
      {
        pokemonsList.map((item,index)=>{
          return (
            <Card pokemon={item} key={index}/>
             
          )
      })
     
      }
     </div>
      </>
    )
  }
  
  export default List