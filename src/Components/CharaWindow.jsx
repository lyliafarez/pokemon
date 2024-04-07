
import Modal from "@mui/material/Modal";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
// import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

function CharaWindow({ closeModal,pokemon }) {


  const cancelButtonRef = useRef(null)
  let pokeId= pokemon.id;
  let pokeHeight= (pokemon.height / 10).toFixed(1)
  let pokeWeight= (pokemon.weight / 10).toFixed(1)
  

  function abbreviateStatName(statName) {
    const abbreviations = {
      'hp': 'Hp',
      'attack': 'Atk',
      'defense': 'Def',
      'special-attack': 'Sp.Atk',
      'special-defense': 'Sp.Def',
      'speed': 'Spd'
      // Add more mappings as needed
    };
    return abbreviations[statName.toLowerCase()] || statName;
  }
  //function to get percentage on status bar
  function generateStatsBars(pokemon) {
    const statBars = [];
  
    for (let i = 0; i < pokemon.stats.length; i++) {
      const stat = pokemon.stats[i];
      const percentage = (stat.base_stat * 100) / 255; // Calculate the percentage
      statBars.push(
        <div key={i} className="mb-2 flex items-center">
          <div
            className={`text-sm font-medium text-white flex ${stat.stat.name === 'special-attack' || stat.stat.name === 'special-defense' ? 'mr-2' : 'mr-4'}`}
            style={{
              paddingRight: stat.stat.name === 'special-attack' || stat.stat.name === 'special-defense' ? '0' : '10px',
              justifyContent: 'right'
            }}
          >{abbreviateStatName(stat.stat.name)}</div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-200">
            <div className="bg-[#FD7D25] h-2.5 rounded-full" style={{ width: `${percentage}%` }}></div>
          </div>
        </div>
      );
    }
    return statBars;
  }

 
  

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
  
  

  return (
    <Transition.Root show={true} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full" style={{width:'700px'}}>
                <div className="bg-white pb-16 pr-8">
                  <div  className="bg-[#395FAB] ">
                    <div className="flex justify-end">      
                          <span className="text-xl font-bold text-[#FFCD20] p-5 pb-0 ">Added to Pokédex</span>
                    </div>
                    <div className="flex-col px-10 ">
                      <p className="text-xl font-bold text-white text-opacity-60">n°{pokemon.id}</p>
                      <p className="absolute font-bold pl-5" style={{ fontSize: '35px', textTransform: 'capitalize', color:getTypeColor(pokemon.types[0].type.name) }}>{pokemon.name}</p>
                    </div>
                    <div className="sm:flex sm:items-start mx-10">
                      <div className="border-8 bg-white rounded-3xl p-5 w-72 space-y-4 mt-9" style={{borderColor:getTypeColor(pokemon.types[0].type.name)}}>
                      <img src={pokemon.sprites.other['official-artwork'].front_default} className="h-30 w-30"/>
                      </div>
                      <div className="ml-10 w-96 px-6 mt-16">
                        <p className="text-lg font-bold text-white">BASE STATS</p>
                        <div>{generateStatsBars(pokemon)}</div>
                        <div className="text-sm">BASE EXP: {pokemon.base_experience}</div>
                      </div>
                    </div>
                    <div className="flex flex-col justify-left ml-10 ">
                    <span className="font-bold">Type</span>
                    <div className="items-center my-1">
                      {displayPokemonTypes(pokemon)}
                    </div>
                      
                      
                    </div>
                    <div className="flex justify-end">
                    <h3 className="text-white text-opacity-60 mr-40 font-bold" style={{ fontSize: '25px' }}>OTHER INFO</h3>
                    </div>
                  </div>
                  <div className="bg-[#FD5849] flex justify-center items-center absolute  px-15 border-2 border-gray-400 z-1 rounded-t-3xl " style={{ bottom: '-2px', left: '165px', width:'360px' ,height:'78px'}}>
                    <div className="grid grid-cols-3 gap-4 p-4 ">
                      <div>
                        <h3 className="text-lg font-semibold ">Height</h3>
                        <span>{pokeHeight} m</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">Weight</h3>
                        <span>{pokeWeight} kg</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">Ability</h3>
                        <span>{pokemon.abilities[0].ability.name}</span>
                      </div>
                    </div>
                </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )


}

export default CharaWindow;
