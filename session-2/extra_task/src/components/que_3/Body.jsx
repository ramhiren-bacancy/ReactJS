import React, { useState } from 'react'
import Header from './Header'
import Display from './Display'
import Footer from './Footer'
import { useCounter } from './CountContext'

const Body = () => {
    const {count} = useCounter()

  return (
    <>
      <h1>I am Root Body: {count}</h1>
      <Header />
      <Display/>
      <Footer/>
    </>
  )
}

export default Body
