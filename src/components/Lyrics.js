import React from 'react'
import { useSelector } from 'react-redux'
function Lyrics() {
    const lyrics = useSelector(state=> state.lyrics)
  return (
    <div className='lyrics pt-2' style={{overflow:'scroll'}}>
        <p>{lyrics?.lyrics} <span className='text-muted'>{lyrics?.error}</span></p>
    </div>
  )
}

export default Lyrics