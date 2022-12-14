import React,{useEffect, useRef} from 'react'
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
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import Logo from '../assets/images/logo.png';
import NavBtn from './NavBtn';
import { useSelector } from 'react-redux';

function Sidenav() {
  const navRef = useRef()
  const {pathname} = useLocation()
  const nav = useSelector(state => state.nav)
  useEffect(() => {
    if(nav.open){
      navRef.current.classList.add('side-nav-open')
    }else{
      navRef.current.classList.remove('side-nav-open')
    }
  }, [nav.open])
  return (
    <div className="d-flex flex-row g-0">
        <div ref={navRef} className={"side-nav justify-content-center align-items-start vh-100 position-sticky top-0 ps-2 pe-2 pt-3 border-end border-dark"} style={{backgroundColor:'#101012'}}>
        <Nav variant="pills"  defaultActiveKey={pathname} className="flex-column gap-2 align-items-start text-center justify-content-center" style={{width:'min-content'}} >
          <Link to={'/'} className='mb-1' style={{width:'100%'}}><img src={Logo} style={{visibility:pathname === '/' ? 'hidden' : 'visible',width:'80%',margin:0,alignSelf:'flex-start'}}/></Link>
          <Nav.Link eventKey="/" className=''>
            <Link style={{textDecoration:'none'}} className='text-white d-flex align-items-center' to={'/'}><HomeRoundedIcon/></Link>
          </Nav.Link>
          <Nav.Link eventKey="/search" className=''>
            <Link style={{textDecoration:'none'}} className='text-white d-flex align-items-center' to={'/search'}><SearchRoundedIcon/></Link>
          </Nav.Link>
          <Nav.Link eventKey="/playlist" className=''>
            <Link style={{textDecoration:'none'}} className='text-white d-flex align-items-center' to={'/playlist'}><PlaylistPlayIcon/></Link>
          </Nav.Link>
          <Nav.Link eventKey="/fav" className=''>
            <Link style={{textDecoration:'none'}} className='text-white d-flex align-items-center' to={'/fav'}><FavoriteRoundedIcon/></Link>
          </Nav.Link>
        </Nav>
        </div>
        <div className='vw-100' style={{backgroundColor:'#000',color:'white'}}>
          <NavBtn/>
          <Navigation/>
          <Outlet/>
        </div>
    </div>
  )
}

export default Sidenav