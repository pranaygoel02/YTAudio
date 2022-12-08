import {useSelector} from 'react-redux'
import List from './List'
import {useLocation} from 'react-router-dom'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addNewPlaylist } from '../redux/actions/index'
import {Link,Outlet} from 'react-router-dom'

function PlaylistLinks() {
  const playlists = useSelector(state=> state.playlist)
  const {pathname} = useLocation()
  const [show, setShow] = useState(false)
  const dispatch = useDispatch()
  const handleNewPlaylist=(e)=>{
    e.preventDefault()
    console.log(e.target.playlistName.value)
    dispatch(addNewPlaylist(e.target.playlistName.value))
    setShow(prev=>false)
  }
    return (
        <>
            {(pathname === '/playlist' || playlists.length>0) && <h1>Your Playlists</h1>}
            {pathname !== '/' && 
            <div>
                <button onClick={()=>setShow(prev=>!prev)}>{show ? 'Hide':'Add new playlist'}</button>
                {show && 
                <form onSubmit={handleNewPlaylist}>
                <input type="text" name='playlistName' placeholder="Enter playlist name"/>
                <button type={'submit'}>Add</button>
                </form>
                }
            </div>
            }
            {playlists.map((playlist,idx) => 
            <div>
            <Link to={`/playlist/${idx}/${playlist.name}`}>{playlist.name}</Link>
            </div>
            )
        }
        <Outlet/>
        </>
  )
}

export default PlaylistLinks