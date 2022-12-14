import React,{useState} from 'react'
import { Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

function NewAlert({setShowAlert,head,descp,variant,link}) {
  const player = useSelector(state=> state.player)
    return (
    <Alert className='position-fixed' variant={variant} onClose={() => setShowAlert(false)} dismissible style={{right:10,top:10,zIndex:10, translate:player.modal_open && '0% 55%'}}>
        <Alert.Heading>{head}</Alert.Heading>
        <p>
          {descp} {!player.modal_open && <Link className={`text-${variant}`} to={link}>here</Link>}
        </p>
      </Alert>
  )
}

export default NewAlert