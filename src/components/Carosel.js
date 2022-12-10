import React from 'react'
import Carousel from 'react-bootstrap/Carousel';

function Carosel() {
  return (

    <Carousel style={{width:'100%', maxHeight:'30em',objectFit:'cover',overflowY:'hidden',zIndex:-1,position:'sticky',top:0}}>
      <Carousel.Item interval={10000}>
        <img
          className="d-block w-100"
          style={{width:'100%', maxHeight:'30em',objectFit:'cover'}}
          src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item interval={10000}>
        <img
          className="d-block w-100 img-fluid"
          style={{width:'100%', maxHeight:'30em',objectFit:'cover'}}
          src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item interval={10000}>
        <img
        style={{width:'100%', maxHeight:'30em',objectFit:'cover'}}
          className="d-block w-100"
          src="https://images.unsplash.com/photo-1499415479124-43c32433a620?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80"
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default Carosel