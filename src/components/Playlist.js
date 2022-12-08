import {useSelector} from 'react-redux'
import List from './List'
import {useLocation,useParams} from 'react-router-dom'
import { useState } from 'react'
import { useDispatch } from 'react-redux'


function Playlist() {
    let {id,name} = useParams()
    console.log(id,name);
  const playlists = useSelector(state=> state.playlist[id].songs)
  console.log(playlists);
    return (
            <List data={playlists} title={name} playlistid={id}/>
            )
  
}

export default Playlist