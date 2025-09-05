import React from 'react'
import Hero from '../Components/HomeComponents/Hero/Hero'
import Reasons from '../Components/HomeComponents/Reasons/Reasons'
import Touch from '../Components/HomeComponents/Touch/Touch'
import ThemeStyleLoader from '../Components/ThemeStyleLoader'

const Home = () => {
  return (
    <div>
      <ThemeStyleLoader/>
      <Hero/>
      <Reasons/>
      <Touch/>
    </div>
  )
}

export default Home