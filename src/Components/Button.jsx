import React , {useState} from 'react'

function Button(props) {
  const [count , setCount] = useState({countValue : 5 , color:'white'})
  const inc = () => { 
    setCount((prevValue)=>
    {
      return prevValue = {...prevValue,countValue : prevValue.countValue + 1}
    }
  )
   }
   const dec = () =>{
    setCount((prevValue)=>prevValue.countValue - 1)
   }
  return (
    <>
    <button onClick={inc}>+</button>
    {count.countValue}-{count.color}
    <button onClick={dec}>-</button>
    </>
  )
}

export default Button
