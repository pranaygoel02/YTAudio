import React,{useEffect, useRef} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import {play,pause,resume,mute,unmute,loop,setDuration,setProgress,setVolume,addFav,removeFav} from '../redux/actions/index'
import '../index.css'
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ProgressBar from './ProgressBar';
import RepeatOneTwoToneIcon from '@mui/icons-material/RepeatOneTwoTone';
import { Slider,Stack } from '@mui/material';
import ReactPlayer from 'react-player';

function Player() {
    const dispatch = useDispatch()
    const playerRef = useRef()
    const player = useSelector(state=> state.player)
    const storeData = useSelector(state=> state)

    const handleDuration = () => {
        dispatch(setDuration(playerRef.current.getDuration()))
    }

    const handleProgress = (progress) => {
        dispatch(setProgress(progress.played * 100))
    }


    // useEffect(()=>{
    //     if(player.play){
    //         playerRef.current.onPlay(console.log(playerRef.current.getDuration()))

    //         // dispatch(setDuration(playerRef.current.getDuration()))
    //     }
    //     else{
            
    //     }
    // },[player.song?.key])

  return (
    <div className={`vw-100 text-white border-top border-dark p-3 pt-2 pb-2 d-flex align-items-center justify-content-between position-fixed player ${(player.play || player.song !== null) && 'player-play'}`} style={{bottom:0,background:'#111012'}}>
        <ProgressBar/>
        <ReactPlayer ref={playerRef} onStart={handleDuration} playsinline={true} onProgress={handleProgress} style={{position:'absolute',top:-100,left:'44%',zIndex:-1,visibility:'visible',touchAction:'none'}} volume={player.volume/100} loop={player.loop} controls={false} width='300px' height='200px' playing={player?.play} muted={player.mute} url={storeData.track.track}/>
        <div id='play-control'>
            <SkipPreviousIcon/>
            {player.play  ? <PauseIcon fontSize='large' onClick={()=>dispatch(pause())}/> : <PlayArrowIcon fontSize='large' onClick={()=>dispatch(resume())}/>}
            <SkipNextIcon/>
        </div>
        <div className='d-flex align-items-center gap-2 player-text'>
        <img src={player.song?.images.coverart} alt={player.song?.title} className='img-fluid rounded' style={{width: '36px',aspectRatio:1}}/>
        <div className='d-flex flex-column'>
        <h2 className='fs-6 mb-0'>{player.song?.title}</h2>
        <p className='mb-0 text-secondary'>{player.song?.subtitle}</p>
        </div>
        </div>
        
        <div id='more-control' className='d-flex flex-row align-items-center gap-4' style={{width:'15em'}}>
            <RepeatOneTwoToneIcon color={player.loop ? 'primary' : 'white'} onClick={()=>dispatch(loop())}/>
            <Slider classes={{root:'w-100  rounded-0 p-0'}} style={{left:0, top:-1,height:'0.15em'}}
                aria-label="Volume"
                size='small'
                defaultValue={player?.volume}
                value={player.volume}
                color="primary"
                disabled = {player.mute}
                onChange={(e,v)=>dispatch(setVolume(v))}
            />
            {!player.mute ? <VolumeUpIcon onClick={()=>dispatch(mute())}/> : <VolumeOffIcon onClick={()=>dispatch(unmute())}/>}
            {storeData.fav.filter(e => e.key === player.song?.key).length === 0 && <FavoriteBorderIcon onClick={()=>dispatch(addFav(player.song))}/>}
            {storeData.fav.filter(e => e.key === player.song?.key).length !== 0 &&  <FavoriteIcon onClick={()=>dispatch(removeFav(player.song))}/>}
        </div>
    </div>
  )
}

export default Player