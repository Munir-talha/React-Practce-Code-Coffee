import { useState } from 'react'
import Button from './Components/Button'
import Card from './Components/Card'
import './App.css'
import Form from './Components/Form'
import ConditionalRendering from './Components/ConditionalRendering'
import MyForm from './Components/MyForm'
import Todo from './Components/Todo'

function App() {
  const [count, setCount] = useState({name:'talha' , desig:'CS'})
  return (
    <>
    <Todo/>
    {/* <MyForm/> */}
    {/* <ConditionalRendering/> */}
    {/* <Form/> */}
      {/* <Button/> */}
      
    </>
  )
}

export default App
