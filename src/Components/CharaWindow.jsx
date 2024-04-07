
import Modal from "@mui/material/Modal";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
// import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

function CharaWindow({ closeModal,pokemon, getTypeColor, displayPokemonTypes }) {
  //useState for playing audio
  const [isPlaying, setIsPlaying] = useState(false);

  const playAudio = () => {
    const audio = new Audio(pokemon.cries.legacy);
    audio.play();
    setIsPlaying(true);
  };

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
                          <span className="text-xl font-bold text-[#FFCD20] p-5 pb-0 ">
                          {pokemon.selected ? "Added to Pokédex" : "Not Added to Pokédex"}
                          </span>
                    </div>
                    <div className="flex-col px-10 ">
                      <p className="text-xl font-bold text-white text-opacity-60">n°{pokemon.id}</p>
                      <p className="absolute font-bold pl-5" style={{ fontSize: '35px', textTransform: 'capitalize', color:getTypeColor(pokemon.types[0].type.name) }}>{pokemon.name}</p>
                    </div>
                    <div className="sm:flex sm:items-start mx-10">
                      <div className="border-8 bg-white rounded-3xl p-5 w-72 space-y-4 mt-9" style={{borderColor:getTypeColor(pokemon.types[0].type.name)}}>
                      <img src={pokemon.sprites.other['official-artwork'].front_default} className="h-30 w-30"/>
                      <button style={{ width: '25px',position: 'absolute',bottom: '175px', left:'235px' }}><img src="src/img/sound_audio.png" alt="sound image" className="  cursor-pointer" onClick={playAudio}/>
                      </button>
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
