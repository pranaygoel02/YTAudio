import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { toggleNav } from '../redux/actions/index'
function NavBtn() {
  const dispatch = useDispatch()
  const nav = useSelector(state=> state.nav)
  const player = useSelector(state=> state.player)
  return (
    <div onClick={()=>dispatch(toggleNav())} className={`nav-btn position-fixed flex-column align-items-center justify-content-center ${nav.open && 'nav-btn-animate'}`} style={{width:'1.5em',top:20,right:20,gap:nav.open ? '0':'0.8em',zIndex:2,visibility: player.modal_open ? 'hidden' : 'visible'}}>
      <span className='bg-white w-100' style={{height:'2px'}}></span>
      <span className='bg-white w-100' style={{height:'2px'}}></span>
    </div>
  )
}

export default NavBtn