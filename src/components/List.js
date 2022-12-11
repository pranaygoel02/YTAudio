import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation,useNavigate } from 'react-router-dom'
import {addFav,removeFav,addToPlaylist,removeFromPlaylist, removePlaylist, play,pause,searchTrack} from '../redux/actions/index'
// import data from '../data/music'
import NewAlert from './Alert'
import Card from './Card'
import {Link} from 'react-router-dom'
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Spinner from './Spinner'

function List({data,title,playlistid,more}) {
    const storeData = useSelector(state=> state)
    const dispatch = useDispatch()
    const [showPlaylists, setShowPlaylists] = useState(false)
    const [selected, setSelected] = useState([])
    const [showAlert, setShowAlert] = useState(false)
    const {pathname} = useLocation()
    const navigate = useNavigate()
    // console.log(pathname);

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
        <div className='d-flex flex-row justify-content-between align-items-center mb-4'>
        <h2 style={{fontWeight:`${pathname !== '/search' && 'bold'}`}}>{title}</h2>
        {title !== 'Quick Picks' && pathname!=='/fav' && more && <Link to={'/fav'} className='btn btn-sm rounded-pill btn-outline-secondary'>MORE</Link>}
        {pathname === `/playlist/${playlistid}/${title.split(' ').join('%20')}` && <button className='btn rounded-pill btn-sm btn-outline-secondary' onClick={()=>{
            dispatch(removePlaylist(title,playlistid))
            navigate('/playlist')
        }}>Remove Playlist</button>}
        </div>
        {showPlaylists && 
            <form className='form-control p-3 d-flex flex-column gap-2 m-3' style={{position:'fixed',zIndex:2, isolation:'isolate', right:0,top:0,maxWidth:'max-content'}} onSubmit={handleAddition}>
                <div className='d-flex flex-row gap-5 align-items-center justify-content-center'>
                <h5>Add to Playlist</h5>
                <button onClick={()=>setShowPlaylists(prev=>false)} type="button" class="btn-close align-self-start mb-0" aria-label="Close"></button>
                </div>
                {storeData.playlist.map((playlist,idx) =>
                <div className='d-flex flex-row gap-2'>
                    <input className="form-check" type="checkbox" id={idx} name='playlist' value={playlist.name}/>{playlist.name}
                </div>
                )}
                <button className='btn btn-outline-primary btn-sm' type={'submit'}>Add</button>
            </form>}
            {showAlert && <NewAlert setShowAlert={setShowAlert} head={'No Playlists Found!'} descp={'Please add your first playlist'} variant={'danger'} link={'/playlist'}/>}
        <div className='d-flex list gap-4 flex-wrap justify-content-start align-items-start'>
        {data.map((item,idx)=>{
            return(
                <div className='d-flex flex-column justify-content-start align-items-center position-relative card-box'>
                <Card image={item.images?.coverart} title={item.title} sub={item.subtitle} type={item.type}/>
                <div className='position-absolute d-flex flex-column align-items-center gap-2 rounded w-100 show-btns' style={{height:'200px'}}>
                        <div style={{cursor:'pointer'}}>
                            {storeData.track.loading ? <Spinner/> :
                            storeData.player.play && storeData.player.song.key === item.key ? <PauseIcon sx={{ fontSize: 70 }} onClick={()=>dispatch(pause())}/> : <PlayArrowIcon id='play-icon' sx={{ fontSize: 70 }} onClick={()=>dispatch(searchTrack(item))}/>}
                        </div>
                        <div className='d-flex flex-row justify-content-around w-100'>
                        {pathname !== `/playlist/${playlistid}/${title.split(' ').join('%20')}` && <PlaylistAddIcon onClick={()=>{
                            if (storeData.playlist.length === 0) {
                                // alert('No playlists found')
                                setShowAlert(prev=>true)
                            }
                            else {
                                setSelected(prev=>item)
                                setShowPlaylists(prev=>!prev)
                            }
                            }}/>}
                            
                        {(pathname !== '/' && pathname!=='/fav' && pathname === `/playlist/${playlistid}/${title.split(' ').join('%20')}`) && <PlaylistRemoveIcon  onClick={()=>dispatch(removeFromPlaylist(item,playlistid))}/>}
                        {storeData.fav.filter(e => e.key === item.key).length === 0 && <FavoriteBorderIcon  onClick={()=>dispatch(addFav(item))}/>}
                        {storeData.fav.filter(e => e.key === item.key).length !== 0 && <FavoriteIcon onClick={()=>dispatch(removeFav(item))}/>}
                        </div>
                </div>
                </div>
            )
        })
        }
    </div>
    </div>
  )
}

export default List