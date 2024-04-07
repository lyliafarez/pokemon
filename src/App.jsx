import './App.css'
import Header from './Components/Header';
import NavBar from './Components/NavBar';
import Favourite from './Pages/Favourites';
import Main from './Pages/Main'
import PlaySound from './Components/PlaySound';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
 

  return (
    <div className='bg-yellow-100 h-screen overflow-y-auto px-10'>
    
    <BrowserRouter>
    <Header/>
    {/* <NavBar/> */}
    <PlaySound></PlaySound>
      <div>
    <Routes>        
      <Route path="/"  element={<Main/>} />
      <Route path="/favourites" element={<Favourite/>} />
    </Routes>
    </div>
    </BrowserRouter>
    
    </div>
  )
}

export default App
