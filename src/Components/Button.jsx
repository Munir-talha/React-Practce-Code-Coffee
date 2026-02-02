import React , {useState} from 'react'

function Button(props) {
  const [count , setCount] = useState({countValue : 5 , color:'white'})
  const inc = () => { 
    setCount((prevValue)=>
    {
      console.log(prevValue)
      prevValue.countValue = prevValue.countValue + 1
    }
  )
   }
   const dec = () =>{
    setCount((prevValue)=>prevValue.countValue - 1)
   }
  return (
    <>
    <button onClick={inc}>+</button>
    {/* {count.countValue}-{count.color} */}
    {count.countValue}
    <button onClick={dec}>-</button>
    </>
  )
}

export default Button
