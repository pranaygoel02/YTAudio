import React from 'react'

function Card({image,title,sub,type}) {
  return (
    <>
    <div className='d-flex flex-column gap-2' style={{maxWidth:'12em'}}>
        <img src={image} className="img-thumbnail" alt="..." style={{width:'100%',border:'none',padding:0}}/>
        <div className='d-flex flex-column'>
            <h2 className='fs-5'>{title}</h2>
            <p className='text-secondary fw-bold'>{type} • {sub}</p>
        </div>
    </div>
  </>
  )
}

export default Card