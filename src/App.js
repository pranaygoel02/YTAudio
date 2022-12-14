import React,{useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Playlist from './components/Playlist'
import PlaylistLinks from './components/PlaylistLinks'
import Fav from './components/Fav'
import Sidenav from './components/Sidenav'
import Search from './components/Search';
import Navigation from './components/Navbar';
import Player from './components/Player';
function App() {
  useEffect(()=>{
    if(localStorage.getItem('Played Songs') === null)
      localStorage.setItem('Played Songs',JSON.stringify([]))
  },[])
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Sidenav/>}>
            <Route path="/" element={<Home/>} />
            <Route path="playlist" element={<PlaylistLinks/>}>
            </Route>
            <Route path="playlist/:id/:name" element={<Playlist/>}/>
            <Route path="fav" element={<Fav/>} />
            <Route path='search' element={<Search/>}/>
          </Route>
        </Routes>
      </Router>
      <Player/>
    </div>
  )
}

export default App