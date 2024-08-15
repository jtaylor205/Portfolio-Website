import React from 'react'
import Transition from '../../transition'
import TypingEffect from './TypingEffect'
const About = () => {
  return (
    <div> <TypingEffect text={"Hello, I'm Jaedon!"} /></div>
  )
}

export default Transition(About);