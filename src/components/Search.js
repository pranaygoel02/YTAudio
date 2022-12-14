import React,{useState,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {search,searchResult} from '../redux/actions/index'
import Artists from './Artists'
import List from './List'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import SearchIcon from '@mui/icons-material/Search';
import '../index.css'

function Search() {
  const [query, setQuery] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [showSearchResults, setShowSearchResults] = useState(true)
  const result = useSelector(state=> state.search)
  const searchResults = useSelector(state=> state.result)
  const dispatch = useDispatch()
  const handleChange = (e)=>{
    // console.log(e.target.value)
    setQuery(e.target.value)
  }
  const handleSearch = (e)=>{
    e.preventDefault()
    setShowSearchResults(prev=>true)
    // console.log(query)
    dispatch(search(query))
  }
  const handleSearchQuery = (item)=>{
    setShowSearchResults(prev=>false)
    setSearchQuery(prev=>item)
    dispatch(searchResult(item))
  }  
  return (
    <div className='container pt-5 pb-5 min-vh-100'>
        <h2 className='fw-bold'>Search</h2>
        <div className='d-flex flex-row gap-2 align-items-center justify-content-between'>
        <form className='input-group needs-validation gap-2' noValidate onSubmit={handleSearch}>
        <input type={'text'} value={query} onChange={handleChange} placeholder='Search song or artists...' className='form-control bg-transparent border-secondary rounded-0 border-0 border-bottom text-primary' required ></input>
        <button type='submit' className="btn btn-outline-primary rounded-pill" style={{zIndex:0}}><SearchIcon/></button>
        </form>
        {result.data && <button className={`btn btn-outline-secondary rounded-pill`} onClick={()=>setShowSearchResults(prev=>!prev)}>{ result.data.length > 0 && !showSearchResults ? <ArrowDropDownIcon/> : <ArrowDropUpIcon/> }</button>}
        </div>
        
        <ul className='list-group list-group-flush bg-transparent' style={{display: showSearchResults ? 'block' : 'none'}}>
        {result.loading && <p>Loading...</p>}
        {result.data && result.data.map((item,idx)=><li className='list-group-item bg-transparent text-muted search' role={'button'} onClick={()=>handleSearchQuery(item)}>{item}</li>)}
        {result.error && !result.loading && <p>{result.error}</p>}
        </ul>
        <div className='mt-3 pb-5'>
        {searchResults.loading && <p>Loading...</p>}
        {!searchResults.loading && <h1 className="fs-4 text-muted">{searchQuery && 'Showing results for'} {searchQuery}</h1>}
        <div className='d-flex flex-column'>
        {searchResults.tracks?.length > 0  && <List title={'Songs'} data={searchResults.tracks}/>}
        {searchResults.artists?.length > 0 && <Artists title={'Artists'} data={searchResults.artists}/>}
        </div>
        {searchResults.error && !result.loading && <p>{result.error}</p>}
        </div>
    </div>
  )
}

export default Search