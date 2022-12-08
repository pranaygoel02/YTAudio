import React, { useEffect, useState } from 'react'
import data from '../data/music'
import { useSelector } from 'react-redux'
import List from './List'
import Fav from './Fav'
import Playlist from './Playlist'
import PlaylistLinks from './PlaylistLinks'

function Home() {
  const storeData = useSelector(state => state)
    return (
      <>
      <div>
        <Fav/>
        <PlaylistLinks/>
      </div>
    <List data={data} title={'Home'}/>
    </>
  )
}

export default Home