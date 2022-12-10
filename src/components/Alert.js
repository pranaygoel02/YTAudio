import React,{useState} from 'react'
import { Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function NewAlert({setShowAlert,head,descp,variant,link}) {
    return (
    <Alert className='position-fixed' variant={variant} onClose={() => setShowAlert(false)} dismissible style={{right:10,top:10,zIndex:10}}>
        <Alert.Heading>{head}</Alert.Heading>
        <p>
          {descp} <Link className={`text-${variant}`} to={link}>here</Link>
        </p>
      </Alert>
  )
}

export default NewAlert