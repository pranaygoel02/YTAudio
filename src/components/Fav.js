import React,{useEffect, useState} from 'react'
import List from './List'
import {useSelector} from 'react-redux'

function Fav() {
  const favs = useSelector(state=> state.fav)
    return (
        <>
            <List data={favs} title={'Your Favs'}/>
        </>
  )
}

export default Fav