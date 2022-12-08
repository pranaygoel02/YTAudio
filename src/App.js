import React,{useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Playlist from './components/Playlist'
import PlaylistLinks from './components/PlaylistLinks'
import Fav from './components/Fav'
import Sidenav from './components/Sidenav'
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Sidenav/>}>
            <Route path="/" element={<Home/>} />
            <Route path="playlist" element={<PlaylistLinks/>}>
              <Route path=":id/:name" element={<Playlist/>}/>
            </Route>
            <Route path="fav" element={<Fav/>} />
          </Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App