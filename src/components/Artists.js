import React from 'react'

function Artists({title,data}) {
  return (
    <div>
        <h1>{title}</h1>
        {data.map((item,idx)=>{
            return(
                <div key={idx} style={{display:'flex', gap:'16px'}}>
                    <img src={item?.avatar} alt={item.name} width="100px"/>
                    <div>
                        <h4>{item.name}</h4>
                    </div>
                </div>
            )
        })
        }
    </div>
    )
}

export default Artists