import React from 'react'
import { Link,Outlet } from 'react-router-dom'

function Sidenav() {
  return (
    <div>
        <div style={{display:'flex', gap:'16px'}}>
            <Link to="/">Home</Link>
            <Link to="/playlist">Playlist</Link>
            <Link to="/fav">Fav</Link>
        </div>
        <Outlet/>
    </div>
  )
}

export default Sidenav