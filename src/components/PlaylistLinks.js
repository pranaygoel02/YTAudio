import {useSelector} from 'react-redux'
import List from './List'
import {useLocation} from 'react-router-dom'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addNewPlaylist } from '../redux/actions/index'
import {Link,Outlet} from 'react-router-dom'
import CloseIcon from '@mui/icons-material/Close';
import PlaylistCard from './PlaylistCard'

function PlaylistLinks() {
  const playlists = useSelector(state=> state.playlist)
  const {pathname} = useLocation()
  const [show, setShow] = useState(false)
  const dispatch = useDispatch()
  const handleNewPlaylist=(e)=>{
    e.preventDefault()
    if(e.target.playlistName.value !== '')
        dispatch(addNewPlaylist(e.target.playlistName.value))
    setShow(prev=>false)
  }
    return (
        <div className={`${pathname.includes('/playlist') && 'container pt-5 min-vh-100'}`}>
            {/* {(pathname === '/playlist' || playlists.length>0) && <h2>Your Playlists</h2>} */}
            <h2 className='fw-bold'>Your Playlists</h2>
            {pathname !== '/' && 
            <div className='d-flex flex-row align-items-center mt-3 gap-1'>
                {show && 
                <form onSubmit={handleNewPlaylist} className='input-group needs-validation gap-1' noValidate>
                <input type="text" name='playlistName' placeholder="Enter playlist name" className='form-control bg-transparent border-secondary rounded-0 border-0 border-bottom text-primary' required />
                <button type={'submit'} className="btn btn-outline-primary rounded-pill">Add</button>
                </form>
                }
                <button type="button" onClick={()=>setShow(prev=>!prev)} className={`btn btn-outline-${show ? 'secondary' : 'primary'} rounded-pill`}>{!show && 'Add new playlist'}{show && <CloseIcon/>}</button>
            </div>
            }
            {/* {playlists.length === 0 && <p className='text-muted mb-0'>No playlists found</p>} */}
            <div className='d-flex gap-4 align-items-center justify-content-start pt-4'>
            {playlists.map((playlist,idx) => 
            <Link to={`/playlist/${idx}/${playlist.name}`} style={{textDecoration:'none'}}><PlaylistCard title={playlist.name}/></Link>
            )
          }
          </div>
        <Outlet/>
        </div>
  )
}

export default PlaylistLinks