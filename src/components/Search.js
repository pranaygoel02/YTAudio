import React,{useState,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {search,searchResult} from '../redux/actions/index'
import Artists from './Artists'
import List from './List'

function Search() {
  const [query, setQuery] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [showSearchResults, setShowSearchResults] = useState(true)
  const result = useSelector(state=> state.search)
  const searchResults = useSelector(state=> state.result)
  const dispatch = useDispatch()
  const handleChange = (e)=>{
    console.log(e.target.value)
    setQuery(e.target.value)
  }
  const handleSearch = (e)=>{
    e.preventDefault()
    setShowSearchResults(prev=>true)
    console.log(query)
    dispatch(search(query))
  }
  const handleSearchQuery = (item)=>{
    setShowSearchResults(prev=>false)
    setSearchQuery(prev=>item)
    dispatch(searchResult(item))
  }  
  return (
    <div>
        <form onSubmit={handleSearch}>
        <input type={'text'} value={query} onChange={handleChange} placeholder='Search song here'></input>
        <button type='submit'>Search</button>
        </form>
        {result.data && <button onClick={()=>setShowSearchResults(prev=>!prev)}>{showSearchResults ? 'Hide' : 'Show'} Results</button>}
        
        <div style={{display: showSearchResults ? 'block' : 'none'}}>
        {result.loading && <p>Loading...</p>}
        {result.data && result.data.map((item,idx)=><p role={'button'} onClick={()=>handleSearchQuery(item)}>{item}</p>)}
        {result.error && !result.loading && <p>{result.error}</p>}
        </div>
        <div>
        {searchResults.loading && <p>Loading...</p>}
        <h1>{searchQuery}</h1>
        <div style={{display:'flex',gap:'16px'}}>
        {searchResults.tracks && <List title={'Songs'} data={searchResults.tracks}/>}
        {searchResults.artists && <Artists title={'Artists'} data={searchResults.artists}/>}
        </div>
        {searchResults.error && !result.loading && <p>{result.error}</p>}
        </div>
    </div>
  )
}

export default Search