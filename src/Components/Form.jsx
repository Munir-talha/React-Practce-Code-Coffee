import React, { useState } from 'react'

function Form() {
    const [userCred , setUserCred] = useState({Fname : '' , Pass : ''})
    const [pass , setPass] = useState('')
    

    const onSubmit = () => {
        console.log(userCred.Fname)
    }

  return (
    <div>
      <div><input type="text" value={userCred.Fname} placeholder='Enter Name' onChange={(e) => 
        setUserCred((prevValue)=>
        {
            return prevValue = {...prevValue , Fname : e.target.value}
        }
        )
        } ></input></div>
      <div><input type="password" placeholder='Enter Password' onChange={(e) => setPass(e.target.value)}></input></div>
      <button onClick={onSubmit}>Submit</button>
      
    </div>
  )
}

export default Form
