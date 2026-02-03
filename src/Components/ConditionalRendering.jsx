import React, { useState } from 'react'

const ConditionalRendering = () => {
    const [isDisable , setIsDisable] = useState(false)
    const changeDisability = () => {
        setIsDisable(!isDisable)
    }
  return (
    <div>
        {/* Ternary Operator
        {isDisable==='true'?<input type='text' placeholder='Enter Name'></input>:""} */}

        {isDisable && <div><input type='text' placeholder='Enter Name'></input></div>}
           <button onClick={changeDisability}>Is Disable</button> 
    </div>
  )
}

export default ConditionalRendering
