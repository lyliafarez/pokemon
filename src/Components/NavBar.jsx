import React from 'react';
import {Link} from 'react-router-dom';
import pokemonImg from "../img/pokemon-logo-pokemon-icon-transparent-free-png.webp"


const NavBar=()=>{
    return (    
                <div className='flex flex-row justify-between items-center mx-4'>
                    <img className="h-20 w-30" src={pokemonImg} alt="" />
                    <div className='text-white font-bold text-xl'>
                        <Link to="/">Stocks</Link>
                    </div>
                    <div className='text-white font-bold text-xl'>
                        <Link to="/favourites">Favourite</Link>
                   </div>
                    
                </div>
    )

}

export default NavBar;