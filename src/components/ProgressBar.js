import React from 'react'
import '../index.css'
import { Slider } from '@mui/material';
import { useSelector } from 'react-redux';

function ProgressBar({value}){
    const player = useSelector(state=> state.player)
  return(
    <>
    <input type={'range'} className='slider position-absolute w-100 rounded-0 p-0' value={player.progress} min='0' max='100' style={{left:0, top:-1,height:'0.15em'}}/>
    <div className='time-stamp position-absolute d-flex justify-content-between align-items-center pe-4' style={{padding:0,width:'100%',zIndex:-1,top:-30}}>
      <p className='text-muted'>{Math.floor(player.progress_seconds/60)}:{Math.ceil(player.progress_seconds%60)}</p>
      <p className='text-muted'>{Math.floor(player.duration/60)}:{Math.ceil(player.duration%60)}</p>
    </div>
    </>
    )
}

export default ProgressBar