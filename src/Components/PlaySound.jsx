import React, { useState, useEffect } from "react";
import Sound from 'react-sound';
import music from '../audio/1_Min_Pokemon_tcg_background_music.mp3'
import { PlayIcon, PauseIcon, StopIcon} from '@heroicons/react/24/solid'
function PlaySound() {
    const [playStatus, setPlayStatus] =useState(() => {
        return JSON.parse(localStorage.getItem("sound")) || Sound.status.PLAYING;
      });

    

  const handlePlay = () => {
    setPlayStatus(Sound.status.PLAYING);
    localStorage.setItem("sound", JSON.stringify(Sound.status.PLAYING))
  };

  const handlePause = () => {
    setPlayStatus(Sound.status.PAUSED);
    localStorage.setItem("sound", JSON.stringify(Sound.status.PAUSED))
  };

  const handleStop = () => {
    setPlayStatus(Sound.status.STOPPED);
    localStorage.setItem("sound", JSON.stringify(Sound.status.STOPPED))
  };


    return(
        <div className="fixed bottom-10 left-10">
            <div className="flex flex-row gap-4">
            <button className="bg-orange-400 rounded-full px-2 py-2 opacity-50" onClick={handlePlay}><PlayIcon className="h-8 w-8"/></button>
            <button className="bg-orange-400 rounded-full px-2 py-2 opacity-50" onClick={handlePause}><PauseIcon className="h-8 w-8"/></button>
            <button className="bg-orange-400 rounded-full px-2 py-2 opacity-50" onClick={handleStop}><StopIcon className="h-8 w-8"/></button>

            </div>
      
      <Sound
        url={music}
        playStatus={playStatus}
        onFinishedPlaying={handleStop}
        loop
      />
           
        </div>
    )
}
export default PlaySound;