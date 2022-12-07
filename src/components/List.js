import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {addFav,removeFav,addToPlaylist,removeFromPlaylist} from '../redux/actions/index'
// import data from '../data/music'

function List({data}) {
    const storeData = useSelector(state=> state)
    const dispatch = useDispatch()
    return (
    <div>
        {data.map((item,idx)=>{
            return(
                <div key={idx} style={{display:'flex', gap:'16px'}}>
                    <img src={item.images.coverart} alt={item.title} width="100px"/>
                    <div>
                        <h3>{item.title}</h3>
                        <p>{item.subtitle}</p>
                        {storeData.playlist.filter(e => e.key === item.key).length === 0 && <button onClick={()=>dispatch(addToPlaylist(item))}>Add to playlist</button>}
                        {storeData.playlist.filter(e => e.key === item.key).length !== 0 && <button onClick={()=>dispatch(removeFromPlaylist(item))}>Remove from playlist</button>}
                        {storeData.fav.filter(e => e.key === item.key).length === 0 && <button onClick={()=>dispatch(addFav(item))}>Make Fav</button>}
                        {storeData.fav.filter(e => e.key === item.key).length !== 0 && <button onClick={()=>dispatch(removeFav(item))}>Remove from Fav</button>}
                    </div>
                </div>
            )
        })
        }
    </div>
  )
}

export default List