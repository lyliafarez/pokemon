
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div  className="bg-[#1d4ed8] ">
                    <div className="flex">
                    <div className="flex-none w-14 ">
                      01
                    </div>
                    <div className="flex-auto w-60 ">
                      <p>pokemon ID is : {pokeId}</p>
                    </div>
                    <div className="flex-auto w-34 ">
                    <button>Add to my favorites</button>
                    </div>
                    </div>
                    <div className="sm:flex sm:items-start">
                      <div className="">
                      <img src={pokemon.sprites.other['official-artwork'].front_default} className="h-30 w-30"/>
                      </div>
                      <div>
                        test
                      </div>
                      <div>
                      {pokemon.id}
                      </div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                        {pokemon.name}
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                          {pokeId}
                          </p>
                        </div>
                        {/* change the infow when clicking next */}
                        <button>next</button>
                      </div>
                    </div>
                    <div>
                      test the other div
                    </div>
                  </div>
                  <div className="bg-[#FD5849]">
                      <h3>Evolution</h3>
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
