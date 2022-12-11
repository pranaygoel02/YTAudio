import React from 'react'

function Card({image,title,sub,type}) {
  return (
    <>
    <div className='d-flex gap-2 card bg-transparent '>
        <img src={image ? image : 'https://i.pinimg.com/originals/55/27/89/552789ccf1e4e919e17930976a5e62c9.jpg'} className="img-thumbnail card-img" alt="..." style={{width:'100%',border:'none',padding:0}}/>
        <div className='d-flex flex-column'>
            <h2 className='fs-5'>{title}</h2>
            <p className='text-secondary fw-bold'>{type} • {sub}</p>
        </div>
    </div>
  </>
  )
}

export default Card