import { useState,useEffect } from "react";
import CharaWindow from "./CharaWindow"
function Card({ pokemon}) {
  const [item, setPokemon] = useState(pokemon);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  useEffect(()=>{
    setPokemon(pokemon)
  },[pokemon])

  return (
    <div className="flex flex-col items-center bg-white rounded-md px-2 py-2"  onClick={handleOpenModal}>
        <div className="border border-1 border-white rounded-md flex justify-center items-center">
          <img src={item.sprites.front_default} className="h-30 w-30"/>
        </div>
        <div className="flex flex-row gap-1 justify-center items-center">
        <span className="px-2 bg-blue-200 rounded-md text-white font-semi-bold">{item.types[0].type.name}</span>
        <span className="font-bold">{item.name}</span>
        </div>
        {isModalOpen && <CharaWindow closeModal={handleCloseModal} pokemon={pokemon}/>}

    </div>
  );
}

export default Card;
