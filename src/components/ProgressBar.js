import React, { useEffect,useState } from 'react'
import '../index.css'
import { Slider } from '@mui/material';
import { useSelector,useDispatch } from 'react-redux';
import { seekTo,setProgress,seekSuccess,play,pause, seek } from '../redux/actions/index';

function ProgressBar({value}){
    const player = useSelector(state=> state.player)
     const dispatch = useDispatch()

    const seekSlider = document.getElementById('seek-slider')
    seekSlider && seekSlider.addEventListener('mouseup', (e) => {console.log(e.clientX/window.innerWidth);dispatch(setProgress(e.target.value,(e.target.value/100)*player.duration));dispatch(seek((e.target.value/100)*player.duration))})
    seekSlider && seekSlider.addEventListener('pointerup', (e) => {console.log(e.clientX/window.innerWidth);dispatch(setProgress(e.target.value,(e.target.value/100)*player.duration));dispatch(seek((e.target.value/100)*player.duration))})
    // seekSlider && seekSlider.addEventListener('', (e) => {console.log(e.clientX/window.innerWidth);dispatch(seek(e.clientX/window.innerWidth))})
    return(
    <>               
    <input type={'range'} id='seek-slider' className='slider position-absolute w-100 rounded-0 p-' value={player.progress} min='0' max='100' style={{left:0, top:-1,height:'0.15em',cursor:'pointer'}} onChange={(e)=>{ dispatch(setProgress(e.target.value,(e.target.value/100)*player.duration))}}/>
    <div className='time-stamp position-absolute d-flex justify-content-between align-items-center pe-4' style={{padding:0,width:'100%',zIndex:-1,top:-30}}>
      <p className='text-muted'>{Math.floor(player.progress_seconds/60)}:{Math.ceil(player.progress_seconds%60) < 10 && '0'}{Math.ceil(player.progress_seconds%60)}</p>
      <p className='text-muted'>{Math.floor(player.duration/60)}:{Math.ceil(player.duration%60)}</p>
    </div>
    </>
    )
}

export default ProgressBar