import React, { useEffect, useState } from 'react'

function List({data}) {
    const [favs, setFavs] = useState(JSON.parse(localStorage.getItem('fav')))
    useEffect(() => {
        if(favs !== null) localStorage.setItem('fav',JSON.stringify(favs))
        console.log(favs);
    }, [favs])
    return (
    <div>
        {data.map((item,idx)=>{
            return(
                <div key={idx} style={{display:'flex', gap:'16px'}}>
                    <img src={item.images.coverart} alt={item.title} width="100px"/>
                    <div>
                        <h3>{item.title}</h3>
                        <p>{item.subtitle}</p>
                        <button>Add to Playlist</button>
                        {favs.filter(fav => fav.key===item.key).length === 0 ? 
                        <button onClick={()=>{
                            if(favs !== null)
                                setFavs(prev=>[...prev, item])
                            else   
                                setFavs([item])
                        }}>Make Fav</button>
                        :
                        <button onClick={()=>{
                            if(favs !== null)
                                setFavs(prev=>prev.filter(fav => fav.key!==item.key))
                            else   
                                setFavs([])
                        }}>Remove from Fav</button>
                        }
                    </div>
                </div>
            )
        })
        }
    </div>
  )
}

export default List