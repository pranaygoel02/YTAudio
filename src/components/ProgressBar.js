import React from 'react'
import '../index.css'
import { Slider } from '@mui/material';

function ProgressBar({value}){
  return(
    <Slider classes={{root:'w-100 position-absolute rounded-0 p-0',track:'bg-primary',thumb:'bg-primary progress-btn',rail:'bg-white'}} style={{left:0, top:-1,height:'0.15em'}}
      aria-label="Time"
      size='small'
      defaultValue={0}
      color="primary"
    />
    )
}

export default ProgressBar