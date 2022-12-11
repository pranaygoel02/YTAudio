import React from 'react'

function PlaylistCard({title}) {
  return (
    <div className='img-thumbnail bg-dark bg-gradient p-0 border-0 d-flex align-items-center justify-content-center playlist-card' style={{width:'200px',aspectRatio:1}}>
        <h2>{title}</h2>
    </div>
  )
}

export default PlaylistCard