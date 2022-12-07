import React, { useEffect, useState } from 'react'

function List({data}) {
    const [favs, setFavs] = useState(JSON.parse(localStorage.getItem('fav')))
    const [playlists, setPlaylists] = useState(JSON.parse(localStorage.getItem('playlist')))
    
    useEffect(() => {
        if(favs !== null) localStorage.setItem('fav',JSON.stringify(favs))
        console.log(favs);
    }, [favs])
    
    useEffect(() => {
        if(playlists !== null) localStorage.setItem('playlist',JSON.stringify(playlists))
        console.log(playlists);
    }, [playlists])

    return (
    <div>
        {data.map((item,idx)=>{
            return(
                <div key={idx} style={{display:'flex', gap:'16px'}}>
                    <img src={item.images.coverart} alt={item.title} width="100px"/>
                    <div>
                        <h3>{item.title}</h3>
                        <p>{item.subtitle}</p>
                        {playlists.filter(playlist => playlist.key===item.key).length === 0 ? 
                        <button onClick={()=>{
                            if(playlists !== null)
                                setPlaylists(prev=>[...prev, item])
                            else   
                                setPlaylists([item])
                        }}>Add to playlist</button>
                        :
                        <button onClick={()=>{
                            if(playlists !== null)
                                setPlaylists(prev=>prev.filter(playlist => playlist.key!==item.key))
                            else   
                                setPlaylists([])
                        }}>Remove from playlist</button>
                        }
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