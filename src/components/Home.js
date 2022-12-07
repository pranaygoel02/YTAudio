import React, { useEffect, useState } from 'react'
import data from '../data/music'
import List from './List'

function Home() {
    return (
    <List data={data}/>
  )
}

export default Home