import React,{useEffect, useState} from 'react'
import List from './List'

function Fav() {
    const [favs, setFavs] = useState([])
    useEffect(() => {
        setFavs(JSON.parse(localStorage.getItem('fav')))
    }, [JSON.parse(localStorage.getItem('fav'))])
  return (
    <List data={favs}/>
  )
}

export default Fav