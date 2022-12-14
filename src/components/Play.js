import React from 'react'
import '../index.css'
import { useSelector } from 'react-redux'
function Play() {
    const player = useSelector(state=> state.player)
  return (
    <div className={`position-absolute w-50 h-50 bottom-0  d-flex flex-row align-items-end gap-2 justify-content-between p-5`} style={{translate:'50% -35%',mixBlendMode:'lighten',opacity:'0.7'}}>
      <span id='1' className= {`bg-white w-100 ${!player?.play || player.duration === 0 ? 'animate-eq' : 'animate-eq1'}`} style={{height:'60px'}}></span>
      <span id='2' className= {`bg-white w-100 ${!player?.play || player.duration === 0 ? 'animate-eq' : 'animate-eq2'}`} style={{height:'60px'}}></span>
      <span id='3' className= {`bg-white w-100 ${!player?.play || player.duration === 0 ? 'animate-eq' : 'animate-eq3'}`}style={{height:'60px'}}></span>
    </div>
  )
}

export default Play