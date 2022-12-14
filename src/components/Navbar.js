import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {useLocation} from 'react-router-dom';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import Logo from '../assets/images/logo.png';
import {useDispatch, useSelector} from 'react-redux';

function    Navigation() {
    const [scrollPosition, setScrollPosition] = useState(0);
    const handleScroll = () => {
        const position = window.pageYOffset;
        // console.log(position);
        setScrollPosition(position);
    }
    const {pathname} = useLocation()
    const player = useSelector(state => state.player)
    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });

          return () => {
              window.removeEventListener('scroll', handleScroll);
       };
    }, []);
  
    return (
    pathname ==='/' && <div className='container' style={{position:'fixed',width:'100%', top:0,zIndex:1}}>
        <Navbar style={{background: scrollPosition === 0 && pathname==='/'  ? 'transparent' : 'black',padding:'0.8em 1em',visibility: player.modal_open ? 'hidden' : 'visible'}} >
        <Navbar.Brand style={{color:'white'}} className='fw-bold d-flex align-items-center gap-2'><img src={Logo} className='bg-primary rounded-circle' style={{width:'9%',aspectRatio:1}}></img> YT Audio</Navbar.Brand>
            </Navbar>
    </div>
  );
}

export default Navigation;