import { useState } from 'react'
import Button from './Components/Button'
import Card from './Components/Card'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Button name="Click Here!"/>
      <Button/>
      <Card name="Talha" role="Software Developer" Experience="3yrs"/>
    </>
  )
}

export default App
