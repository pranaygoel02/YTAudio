import React from 'react'
import { Link,Outlet } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import Nav from 'react-bootstrap/Nav';
import Navigation from './Navbar';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import {useLocation} from 'react-router-dom';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import FeaturedPlayListRoundedIcon from '@mui/icons-material/FeaturedPlayListRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';

function Sidenav() {
  const {pathname} = useLocation()
  return (
    <div className="d-flex flex-row g-0">
        <div className="d-flex justify-content-center align-items-start vh-100 position-sticky top-0 ps-2 pe-2 pt-3 border-end border-dark" style={{backgroundColor:'#101012'}}>
        <Nav variant="pills"  defaultActiveKey="/" className="flex-column gap-2 align-items-stretch text-center justify-content-center" >
          <Link to={'/'}><AudiotrackIcon fontSize='large' sx={{color: 'white'}} className='p-1 m-auto rounded-circle bg-primary mb-4' style={{opacity:pathname === '/' ? 0 : 1}}/></Link>
          <Nav.Link eventKey="/" className=''>
            <Link style={{textDecoration:'none'}} className='text-white d-flex align-items-center' to={'/'}><HomeRoundedIcon/></Link>
          </Nav.Link>
          <Nav.Link eventKey="/search" className=''>
            <Link style={{textDecoration:'none'}} className='text-white d-flex align-items-center' to={'/search'}><SearchRoundedIcon/></Link>
          </Nav.Link>
          <Nav.Link eventKey="/playlist" className=''>
            <Link style={{textDecoration:'none'}} className='text-white d-flex align-items-center' to={'/playlist'}><FeaturedPlayListRoundedIcon/></Link>
          </Nav.Link>
          <Nav.Link eventKey="/fav" className=''>
            <Link style={{textDecoration:'none'}} className='text-white d-flex align-items-center' to={'/fav'}><FavoriteRoundedIcon/></Link>
          </Nav.Link>
        </Nav>
        </div>
        <div className='vw-100' style={{backgroundColor:'#000',color:'white'}}>
          <Navigation/>
          <Outlet/>
        </div>
    </div>
  )
}

export default Sidenav