import React, { useRef, useState } from 'react'

const UseReference = () => {
    const [count, setCount] = useState(0)
    const countRef = useRef(0)
    const btnRef = useRef(null)

    // console.log("REf: " , countRef.current)
    
    const handleClick = () => {
        // setCount(count + 1)
        countRef.current = countRef.current + 1
        console.log(countRef.current)
        setCount(countRef.current)
        console.log(btnRef.current.value)
        const val = btnRef.current.value

        // if(age < 18){
        //     btnRef.current.style.backgroundColor = 'red'
        // }else{
        //     btnRef.current.style.backgroundColor = 'blue'
        // }

        val < 18 ? btnRef.current.style.backgroundColor = 'red' : btnRef.current.style.backgroundColor = 'blue'

    }
  return (
    <div>
      <button onClick={handleClick}>Click</button>
      <input ref={btnRef} type='text' style={{border:'1px solid black'}}/>
      {countRef.current}
    </div>
  )
}

export default UseReference
