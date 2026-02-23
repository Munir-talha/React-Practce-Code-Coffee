import { useState } from 'react'
import Button from './Components/Button'
import Card from './Components/Card'
import './App.css'
import Form from './Components/Form'
import ConditionalRendering from './Components/ConditionalRendering'
import MyForm from './Components/MyForm'
import Todo from './Components/Todo'
import FetchApi from './Components/FetchApi'
import ReactUseEffect from './Components/ReactUseEffect'
import UseReference from './Components/UseReference'

function App() {
  const [count, setCount] = useState({name:'talha' , desig:'CS'})
  const [kill , setKill] = useState('true')
  return (
    <>
    <UseReference/>
    {/* <button onClick={()=>setKill(!kill)}>Kill</button>
    {kill ? <FetchApi/> : null} */}
    {/* <FetchApi/> */}
    {/* <ReactUseEffect/> */}
    {/* <Todo/> */}
    {/* <MyForm/> */}
    {/* <ConditionalRendering/> */}
    {/* <Form/> */}
      {/* <Button/> */}
      
    </>
  )
}

export default App
