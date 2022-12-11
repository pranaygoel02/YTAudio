import {useSelector} from 'react-redux'
import List from './List'
import {useLocation,useParams} from 'react-router-dom'
import { useState } from 'react'
import { useDispatch } from 'react-redux'


function Playlist() {
    let {id,name} = useParams()
    // console.log(id,name);
  const playlists = useSelector(state=> state.playlist[id].songs)
  // console.log(playlists);
    return (
            <div className='container vw-100 min-vh-100 pt-5 pb-5'>
            <List data={playlists} title={name} playlistid={id}/>
            {playlists.length === 0 && <p className='text-muted'>Go ahead and add your first song!</p>}
            </div>
            )
  
}

export default Playlist