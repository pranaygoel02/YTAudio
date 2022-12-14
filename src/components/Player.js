import React,{useEffect, useRef,useState} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import {play,pause,resume,mute,unmute,loop,setDuration,setProgress,seekSuccess,seekTo,setVolume,toggleModal,addFav,removeFav,prevSong,nextSong,loopQueue} from '../redux/actions/index'
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
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import RepeatIcon from '@mui/icons-material/Repeat';
import { Slider,Stack } from '@mui/material';
import ReactPlayer from 'react-player';
import SongModal from './SongModal';
import Spinner from './Spinner';

function Player() {
    const dispatch = useDispatch()
    const playerRef = useRef()
    const player = useSelector(state=> state.player)
    const queue = useSelector(state=> state.queue)
    const storeData = useSelector(state=> state)
    const [touchStart, setTouchStart] = useState(0)
    const [touchEnd, setTouchEnd] = useState(0)

    const handleDuration = () => {
        dispatch(setDuration(playerRef.current.getDuration()))
    }

    const handleProgress = (progress) => {
        dispatch(setProgress(progress.played * 100,progress.playedSeconds))
    }

    const handleEnd = () => {
        console.log('ended');
        if(queue.curr_id + 1 < queue.queue.length)
        {
            console.log('if');
            dispatch(nextSong(queue.queue[queue.curr_id + 1]))
        }    
        else{
            console.log('else');
            if(queue.loop){
                console.log('if2');
                dispatch(nextSong(queue.queue[(queue.curr_id + 1) % (queue.queue.length)]))
            }
            else dispatch(pause())   
        }
    }

    const handlePause = () => {
        dispatch(pause())
    }

    const handleResume = () => {
        dispatch(seekSuccess())
        dispatch(resume())
    }

    document.body.onkeyup = function(e) {
        if (e.key === " " ||
            e.code === "Space"   
        ) {
            e.preventDefault();
            var inputs = document.getElementsByTagName('input');
            for(var item in inputs)
            {
                if(inputs[item] == document.activeElement)
                    return;
            }
            if(player.play){
                console.log('pause');
                dispatch(pause())
            }else{
                console.log('resume');
                dispatch(resume())
            }
        }
      }
    useEffect(() => {
        if(player.seeking && player.seek !== null){
            console.log('====================================');
            console.log('seeking');
            console.log('====================================');
            playerRef.current.seekTo(player.seek,'fraction')
        }
    },[player.seeking,player.seek])



  return (
    queue.queue.length > 0 && <div id='player-div' className={`vw-100 text-white border-top border-dark p-3 pt-2 pb-2 d-flex align-items-center justify-content-between position-fixed player ${(player.play || player.song !== null) && 'player-play'}`} style={{bottom:-10,background:'#111012'}}>
        <SongModal/>
        <ProgressBar/>
        <ReactPlayer ref={playerRef} onStart={handleDuration} onPause={handlePause} onEnded={handleEnd} onPlay={handleResume} playsinline={true} onProgress={handleProgress} style={{position:'absolute',top:10,left:'44%',zIndex:-1,visibility:'hidden',touchAction:'none'}} volume={player.volume/100} loop={player.loop} controls={false} width='20px' height='20px' playing={player?.play} muted={player.mute} url={`${queue?.queue[queue.curr_id]?.url}&t=${player.seek}`}/>
        <div id='play-control' className='d-flex align-items-center gap-1'>
            <SkipPreviousIcon onClick={()=>dispatch(prevSong(queue.queue[queue.curr_id >= 1 ? queue.curr_id-1 : queue.curr_id]))}/>
            {player.duration === 0  || player?.loading ? <Spinner/> : player?.play ? <PauseIcon fontSize='large' onClick={()=>dispatch(pause())}/> : <PlayArrowIcon fontSize='large' onClick={()=>dispatch(resume())}/>}
            <SkipNextIcon onClick={()=>dispatch(nextSong(queue.queue[queue.curr_id < queue.queue.length-1 ? queue.curr_id+1 : queue.curr_id]))}/>
        </div>
        <div style={{cursor:'pointer'}} onClick={()=>dispatch(toggleModal())} className='d-flex align-items-center  gap-2 player-text'>
        <img src={queue.queue[queue.curr_id]?.images?.coverart || 'https://i.pinimg.com/originals/55/27/89/552789ccf1e4e919e17930976a5e62c9.jpg'} alt={queue.queue[queue.curr_id]?.title} className='img-fluid rounded' style={{width: '36px',aspectRatio:1}}/>
        <div className='d-flex flex-column ' style={{textOverflow:'ellipsis',overflow: queue.queue[queue.curr_id]?.title.length > 30 ? 'hidden':'visible',whiteSpace:'nowrap'}}>
        <h2 className='fs-6 mb-0' style={{textOverflow: 'ellipsis',overflow: queue.queue[queue.curr_id]?.title.length > 29 ? 'hidden':'visible',whiteSpace:'nowrap'}}>{queue.queue[queue.curr_id]?.title}</h2>
        <p className='mb-0 text-secondary' style={{textOverflow:'ellipsis',overflow:'hidden',whiteSpace:'nowrap'}}>{queue.queue[queue.curr_id]?.subtitle}</p>
        </div>
        </div>
        
        <div id='more-control' className='d-flex flex-row align-items-center gap-4' style={{width:'16em'}}>
            {player.loop && queue.loop && <RepeatOneTwoToneIcon style={{cursor:'pointer'}} color={player.loop ? 'primary' : 'white'} onClick={()=>{dispatch(loop()); dispatch(loopQueue())}}/>}
            {!player.loop &&  <RepeatIcon style={{cursor:'pointer'}} onClick={()=>!queue.loop ? dispatch(loopQueue()) : dispatch(loop())} color={queue.loop ? 'primary' : 'white'}/>}
            <Slider classes={{root:'w-100  rounded-0 p-0'}} style={{left:0, top:-1,height:'0.15em'}}
                aria-label="Volume"
                size='small'
                defaultValue={player?.volume}
                value={player.volume}
                color="primary"
                disabled = {player.mute}
                onChange={(e,v)=>dispatch(setVolume(v))}
            />
            {!player.mute ? <VolumeUpIcon onClick={()=>dispatch(mute())}/> : <VolumeOffIcon style={{cursor:'pointer'}} onClick={()=>dispatch(unmute())}/>}
            {/* {storeData.fav.filter(e => e.key === player.song?.key).length === 0 && <FavoriteBorderIcon style={{cursor:'pointer'}} onClick={()=>dispatch(addFav(player.song))}/>}
            {storeData.fav.filter(e => e.key === player.song?.key).length !== 0 &&  <FavoriteIcon style={{cursor:'pointer'}} onClick={()=>dispatch(removeFav(player.song))}/>} */}
            {player.modal_open ? <ArrowDropDownIcon fontSize='large' style={{cursor:'pointer'}} onClick={()=>dispatch(toggleModal())}/> :<ArrowDropUpIcon fontSize='large' style={{cursor:'pointer'}} onClick={()=>dispatch(toggleModal())}/>}
        </div>
    </div>
  )
}

export default Player