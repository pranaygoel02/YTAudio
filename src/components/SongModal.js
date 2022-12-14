import React,{useEffect, useState} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { toggleModal,addFav,removeFav, fetchLyrics,loop,addToPlaylist } from '../redux/actions/index'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RepeatOneTwoToneIcon from '@mui/icons-material/RepeatOneTwoTone';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import playlistReducer from '../redux/reducers/playlist';
import NewAlert from './Alert'
import Play from './Play';
import '../index.css'
import Lyrics from './Lyrics';
import Queue from './Queue';



function SongModal() {
    const player = useSelector(state=> state.player)
    const fav = useSelector(state=> state.fav)
    const playlist = useSelector(state=> state.playlist)
    const lyrics = useSelector(state=> state.lyrics)
    const queue = useSelector(state=> state.queue)
    const dispatch = useDispatch()
    const [touchStart, setTouchStart] = useState(0)
    const [touchEnd, setTouchEnd] = useState(0)
    const [showPlaylists, setShowPlaylists] = useState(false)
    const [selected, setSelected] = useState([])
    const [showAlert, setShowAlert] = useState(false)
    const [activeId, setActiveId] = useState(null)
    
    const handleAddition = (e) => {
      e.preventDefault()
      var checkboxes = document.querySelectorAll('input[type=checkbox]:checked')
      for (var i = 0; i < checkboxes.length; i++) {
          if(playlist[checkboxes[i].id].songs.filter(item=>item.key === selected.key).length === 0)
              dispatch(addToPlaylist(selected,checkboxes[i].id))
          else{

          }
              // alert('Already in playlist' + playlist[checkboxes[i].id].name)
      }
      setShowPlaylists(prev=>false)
      setSelected(prev=>[])
  }
    
    useEffect(()=>{
        if(player.modal_open && player.song !== null){
            dispatch(fetchLyrics(player.song?.title,player.song?.subtitle))
        }
    },[player.modal_open])

    useEffect(()=>{
      if(touchEnd - touchStart >= 75){
          dispatch(toggleModal())
      }
    },[touchEnd])

    useEffect(()=>{
      setActiveId(0)
    },[])

  return (
    player.modal_open && 
    <div  className='position-absolute  bg-danger p-4 d-flex align-items-center max-vh-100' style={{bottom:'3.7em',left:'50%',translate:'-50%',minHeight:'100vh',minWidth:'100vw',zIndex:0,isolation:'isolate',margin:'auto',    backgroundImage:`url(${queue.queue[queue.curr_id]?.images?.background})`, backgroundRepeat: "no-repeat", backgroundSize:'cover',backgroundPosition:'center',touchAction:'none'}}>
        {showPlaylists && 
            <form className='form-control p-3 d-flex flex-column gap-2 m-3' style={{position:'fixed',zIndex:2, isolation:'isolate', right:0,top:0,maxWidth:'max-content',translate:player.modal_open && '0% 55%'}} onSubmit={handleAddition}>
                <div className='d-flex flex-row gap-5 align-items-center justify-content-center'>
                <h5>Add to Playlist</h5>
                <button onClick={()=>setShowPlaylists(prev=>false)} type="button" class="btn-close align-self-start mb-0" aria-label="Close"></button>
                </div>
                {playlist.map((playlist,idx) =>
                <div className='d-flex flex-row gap-2'>
                    <input className="form-check" type="checkbox" id={idx} name='playlist' value={playlist.name}/>{playlist.name}
                </div>
                )}
                <button className='btn btn-outline-primary btn-sm' type={'submit'}>Add</button>
            </form>}
            {showAlert && <NewAlert setShowAlert={setShowAlert} head={'No Playlists Found!'} descp={'Please add your first playlist'} variant={'danger'} link={'/playlist'}/>}
        
        <div className='overlay position-absolute min-vh-100 min-vw-100 bg-dark bg-gradient' style={{left:'50%',top:0,translate:'-50%',zIndex:-1,mixBlendMode:'multiply'}}></div>
        <div className='container align-content-end d-flex song-modal pt-5' style={{overflow:'scroll',height:'680px'}}>
        <div id='modal' onTouchStart={(e)=>{setTouchStart(prev=>e.targetTouches[0].clientY)}} onTouchMove={(e)=>{e.preventDefault();setTouchEnd(prev=>e.targetTouches[0].clientY)}} className={`d-flex flex-column justify-content-center align-items-center text-center gap-2 modal-art ${!queue.queue[queue.curr_id]?.images?.coverart && 'modal-art-img'}`}>
        <div className='mb-2 position-relative' >
        <img className='img-thumbnail m-0 p-0 border-0' src={queue.queue[queue.curr_id]?.images?.coverart || 'https://i.pinimg.com/originals/55/27/89/552789ccf1e4e919e17930976a5e62c9.jpg'}></img>
        <Play/>
        </div>
        <div>
            <h2>{queue.queue[queue.curr_id]?.title}</h2>
            <p className='text-muted mb-0'>{queue.queue[queue.curr_id]?.type} • {queue.queue[queue.curr_id]?.subtitle}</p>
        </div>
        <div className='d-flex gap-4 py-2'>
            <RepeatOneTwoToneIcon fontSize='large' style={{cursor:'pointer'}} color={player.loop ? 'primary' : 'white'} onClick={()=>dispatch(loop())}/>
            {fav.filter(e => e.key === queue.queue[queue.curr_id]?.key).length === 0 && <FavoriteBorderIcon  fontSize='large' style={{cursor:'pointer'}} onClick={()=>dispatch(addFav(queue.queue[queue.curr_id]))}/>}
            {fav.filter(e => e.key === queue.queue[queue.curr_id]?.key).length !== 0 && <FavoriteIcon fontSize='large' style={{cursor:'pointer'}} onClick={()=>dispatch(removeFav(queue.queue[queue.curr_id]))}/>}
            {<PlaylistAddIcon fontSize='large' style={{cursor:'pointer'}}onClick={()=>{
                            if (playlist.length === 0) {
                                // alert('No playlists found')
                                setShowAlert(prev=>true)
                            }
                            else {
                                setSelected(prev=>queue.queue[queue.curr_id])
                                setShowPlaylists(prev=>!prev)
                            }
                            }}/>}
        </div>
        <div className='rounded-pill d-flex border border-secondary justify-content-center gap-1 align-items-center p-1 px-2 mt-2'>
          <p className='text-muted mb-0'>{Math.floor(player.progress_seconds/60)}:{Math.ceil(player.progress_seconds%60) < 10 && '0'}{Math.ceil(player.progress_seconds%60)}</p>
          <p className='text-muted mb-0'>/</p>
          <p className='text-muted mb-0'>{Math.floor(player.duration/60)}:{Math.ceil(player.duration%60)}</p>
        </div>
        </div>
        <div className='d-flex flex-column align-items-start justify-content-start w-100 pt-5' style={{flexBasis:'50%'}}>
        <div class="btn-group d-flex justify-content-stretch w-100 mb-2" role="group" aria-label="Basic radio toggle button group">
          <input type="radio" onClick={()=>setActiveId(0)} class="btn-check w-100" name="btnradio" id="btnradio1" autocomplete="off" checked={activeId === 0}/>
          <label class="btn rounded-pill btn-outline-secondary border-0" for="btnradio1">Lyrics</label>

          <input type="radio" onClick={()=>setActiveId(1)} class="btn-check w-100" name="btnradio" id="btnradio2" autocomplete="off" checked={activeId === 1}/>
          <label class="btn rounded-pill btn-outline-secondary border-0" for="btnradio2">Queue</label>

        </div>
        {(()=>{
          switch(activeId){
          case 0: return <Lyrics/>
          case 1: return <Queue/>
        }})()}
      </div>
        
        </div>
    </div>
  )
}

export default SongModal