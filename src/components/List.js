import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation,useNavigate } from 'react-router-dom'
import {addFav,removeFav,addToPlaylist,removeFromPlaylist, removePlaylist} from '../redux/actions/index'
// import data from '../data/music'

function List({data,title,playlistid}) {
    const storeData = useSelector(state=> state)
    const dispatch = useDispatch()
    const [showPlaylists, setShowPlaylists] = useState(false)
    const [selected, setSelected] = useState([])
    const {pathname} = useLocation()
    const navigate = useNavigate()
    console.log(pathname);

    const handleAddition = (e) => {
        e.preventDefault()
        var checkboxes = document.querySelectorAll('input[type=checkbox]:checked')
        for (var i = 0; i < checkboxes.length; i++) {
            if(storeData.playlist[checkboxes[i].id].songs.filter(item=>item.key === selected.key).length === 0)
                dispatch(addToPlaylist(selected,checkboxes[i].id))
            else
                alert('Already in playlist')
        }
        setShowPlaylists(prev=>false)
        setSelected(prev=>[])
    }

    return (
    <div>
        <h1>{title}</h1>
        {pathname === `/playlist/${playlistid}/${title.split(' ').join('%20')}` && <button onClick={()=>{
            dispatch(removePlaylist(title))
            navigate('/playlist')
        }}>Remove Playlist</button>}
        {showPlaylists && 
            <form style={{position:'fixed', isolation:'isolate', right:0,bottom:0}} onSubmit={handleAddition}>
                {storeData.playlist.map((playlist,idx) =>
                <>
                    <input type="checkbox" id={idx} name='playlist' value={playlist.name}/>{playlist.name}<br/>
                </>
                )}
                <button type={'submit'}>Add</button>
            </form>}
        {data.map((item,idx)=>{
            return(
                <div key={idx} style={{display:'flex', gap:'16px'}}>
                    <img src={item.images?.coverart} alt={item.title} width="100px"/>
                    <div>
                        <h3>{item.title}</h3>
                        <p>{item.subtitle}</p>
                        {pathname !== `/playlist/${playlistid}/${title.split(' ').join('%20')}` && <button onClick={()=>{
                            if (storeData.playlist.length === 0) {
                                alert('Please create a playlist first')
                            }
                            else {
                                setSelected(prev=>item)
                                setShowPlaylists(prev=>!prev)
                            }
                            }}>Add to playlist</button>}
                            
                        {(pathname !== '/' && pathname!=='/fav' && pathname==='/playlist/.*') && <button onClick={()=>dispatch(removeFromPlaylist(item,playlistid))}>Remove from playlist</button>}
                        {storeData.fav.filter(e => e.key === item.key).length === 0 && <button onClick={()=>dispatch(addFav(item))}>Make Fav</button>}
                        {storeData.fav.filter(e => e.key === item.key).length !== 0 && <button onClick={()=>dispatch(removeFav(item))}>Remove from Fav</button>}
                    </div>
                </div>
            )
        })
        }
    </div>
  )
}

export default List