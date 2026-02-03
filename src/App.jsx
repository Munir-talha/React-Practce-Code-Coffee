import { useState } from 'react'
import Button from './Components/Button'
import Card from './Components/Card'
import './App.css'
import Form from './Components/Form'
import ConditionalRendering from './Components/ConditionalRendering'

function App() {
  const [count, setCount] = useState({name:'talha' , desig:'CS'})
  return (
    <>
    <ConditionalRendering/>
    {/* <Form/> */}
      {/* <Button/> */}
      
    </>
  )
}

export default App
