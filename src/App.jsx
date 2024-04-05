import './App.css'
import NavBar from './Components/NavBar';
import Main from './Pages/Main'
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
 

  return (
    <div className='bg-red-400 h-screen overflow-y-auto'>
    
    <BrowserRouter>
    <NavBar/>
      <div>
    <Routes>        
      <Route path="/"  element={<Main/>} />
      <Route path="/favourites"  element={<Main />}/>
    </Routes>
    </div>
    </BrowserRouter>
    </div>
  )
}

export default App
