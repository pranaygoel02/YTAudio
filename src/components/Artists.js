import React from 'react'

function Artists({title,data}) {
  return (
      
      <div>
        <h2 className='mb-4'>{title}</h2>
        <div className='d-flex flex-row gap-4 flex-wrap justify-content-start align-items-start'>
        {data.map((item,idx)=>{
            return(
                    <>
                <div className='d-flex flex-column gap-2' style={{maxWidth:'12em'}}>
                    <img src={item?.avatar} className="img-thumbnail" alt={item.name} style={{width:'100%',border:'none',padding:0}}/>
                    <div className='d-flex flex-column'>
                        <h2 className='fs-5'>{item.name}</h2>
                    </div>
                </div>
        </>
            )
        })
        }
        </div>
    </div>
    )
}

export default Artists