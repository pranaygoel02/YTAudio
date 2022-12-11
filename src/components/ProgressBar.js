import React from 'react'
import '../index.css'
import { Slider } from '@mui/material';
import { useSelector } from 'react-redux';

function ProgressBar({value}){
    const player = useSelector(state=> state.player)
  return(
    <>
    <input type={'range'} className='slider position-absolute w-100 rounded-0 p-0' value={player.progress} min='0' max='100' style={{left:0, top:-1,height:'0.15em'}}/>
    {/* <Slider classes={{root:'w-100 position-absolute rounded-0 p-0',track:'bg-primary',thumb:'bg-primary progress-btn',rail:'bg-white'}} style={{left:0, top:-1,height:'0.15em'}}
      aria-label="Time"
      size='small'
      value={player?.progress}
      defaultValue={player?.progress}
      color="primary"
    /> */}
    </>
    )
}

export default ProgressBar