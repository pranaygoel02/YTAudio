import React from 'react'
import '../index.css'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import { useSelector,useDispatch } from 'react-redux'
import {removeFromQueue, toggleModal,pause, setIdx} from '../redux/actions/index'
import Play from './Play';

function Queue() {
    const dispatch = useDispatch()
    const queue = useSelector(state=> state.queue)
    const player = useSelector(state=> state.player)
  return (
    <div className='w-100' style={{overflow:'scroll',maxWidth:''}}>
        <ul class="list-group list-group-flush">
        {queue.queue?.map((item,index)=>
            <li class="list-group-item bg-transparent d-flex gap-2 border-secondary align-items-start justify-content-between p-0 py-2">
                <div className='d-flex gap-2 align-items-start'>
                <img className='img-thumbnail p-0 border-0' src={item?.images?.coverart || 'https://i.pinimg.com/originals/55/27/89/552789ccf1e4e919e17930976a5e62c9.jpg'} style={{maxWidth:'50px',aspectRatio:1/1}}></img>
                <div className='d-flex flex-column'>
                <p className='fs-xxs text-white mb-0'>{item?.title}</p>
                <p className='fs-xxs text-muted mb-0 queue-subtitle'>{item?.subtitle}</p>
                </div>
                </div>
                <div className='d-flex flex-row align-items-center gap-2'>
                {item.title === player.song.title ?<EqualizerIcon fontSize='large' className='text-secondary'/>:
                <PlayArrowIcon fontSize='large' className='text-secondary' onClick={()=>dispatch(setIdx(index))}/>}
                <DeleteForeverIcon onClick={()=>{dispatch(removeFromQueue(item)); if(queue.queue.filter(el => el.key !== item.key ).length === 0) {dispatch(toggleModal()); dispatch(pause())}}} style={{cursor:'pointer'}} className='text-secondary align-self-center' fontSize='large'/>
                </div>
            </li>
        )}
        </ul>
    </div>
  )
}

export default Queue