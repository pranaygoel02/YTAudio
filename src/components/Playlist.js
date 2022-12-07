import React,{useEffect, useState} from 'react'
import List from './List'

function Playlist() {
    const [playlists, setPlaylists] = useState([])
    useEffect(() => {
        setPlaylists(JSON.parse(localStorage.getItem('playlist')))
    }, [JSON.parse(localStorage.getItem('playlist'))])
  return (
    <List data={playlists}/>
  )
}

export default Playlist