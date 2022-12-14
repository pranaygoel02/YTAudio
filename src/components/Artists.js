import React from 'react'

function Artists({title,data}) {
  return (
      
      <div>
        <h2 className='mb-4'>{title}</h2>
        <div className='d-flex flex-row gap-4 flex-wrap justify-content-start align-items-start'>
        {data.map((item,idx)=>{
            return(
                    <>
                <div className='d-flex flex-column gap-2 artist'>
                    <img src={item?.avatar ? item.avatar : 'https://t4.ftcdn.net/jpg/03/49/49/79/360_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg'} className="img-thumbnail rounded-circle" alt={item.name} style={{width:'100%',border:'none',padding:0}}/>
                    <div className='d-flex flex-column text-center'>
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