import React,{useEffect, useState} from 'react'
import List from './List'
import {useSelector} from 'react-redux'
import {useLocation} from 'react-router-dom'

function Fav() {
    const {pathname} = useLocation()
  const favs = useSelector(state=> state.fav)
    return (
        <div className={`${pathname === '/fav' && 'container pt-5 pb-5'} ${pathname === '/' && favs.length ===0 && 'd-none'} `} >
            <List data={pathname === '/' ? favs.slice(0,6): favs} more={favs.length > 6} title={pathname === '/fav' ? 'Your favorites':'Your favorites'}/>
            {favs.length === 0 && <p className='text-muted mb-0'>No favorites to show</p>}
        </div>
  )
}

export default Fav