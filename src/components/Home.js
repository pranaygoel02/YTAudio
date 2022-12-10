import React, { useEffect, useState } from 'react'
// import data from '../data/music'
import { useSelector,useDispatch } from 'react-redux'
import List from './List'
import Fav from './Fav'
import Playlist from './Playlist'
import PlaylistLinks from './PlaylistLinks'
import { Row,Col,Container } from 'react-bootstrap'
import Carousel from './Carousel'
import Carosel from './Carosel'
import { searchList,searchListSuccess } from '../redux/actions/index'

function Home() {
  const dispatch = useDispatch()
  const storeData = useSelector(state => state)
  const date = localStorage.getItem('Date');
  const data = JSON.parse(localStorage.getItem('New List'));
  useEffect(()=>{
    if(new Date().getDate() !== new Date(date).getDate())
     {
       console.log('new date:',new Date().getDate());
       console.log(new Date().getDate() !== date)
        console.log('old date:',date);
        console.log('old data:',data);
       dispatch(searchList())
     } 
    else
    {
      console.log('same date');
      dispatch(searchListSuccess(data))
    }
  },[])
    return (
      <>
      <div className='w-100 flex-col pb-5' style={{width:'100%',overflowY:'scroll',overflowX:'hidden',minHeight:'100vh',height:'100vh',width:'100%',position:'fixed', top:0}}>
       <Carosel/>
      <div className='pt-5 pb-5 m-0 vw-100' style={{background: "linear-gradient(178deg,rgba(14,4,32,0.98), black 99%)" }}>
        <div className='container'>
        <Fav/>
        <List data={storeData.list.tracks} title={'Quick Picks'}/>
        {storeData.playlist.length > 0 && <PlaylistLinks/>}
        </div>
      </div>
      </div>
    </>
  )
}

export default Home