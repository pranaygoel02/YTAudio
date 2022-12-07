import React,{useEffect} from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Playlist from './components/Playlist'
import Fav from './components/Fav'
import Sidenav from './components/Sidenav'
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Sidenav/>}>
            <Route path="/" element={<Home/>} />
            <Route path="/playlist" element={<Playlist/>} />
            <Route path="/fav" element={<Fav/>} />
          </Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App