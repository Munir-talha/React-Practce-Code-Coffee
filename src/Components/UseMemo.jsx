import React, { useMemo, useState } from 'react'

function UseMemo() {
    const [count , setCount] = useState(0)
    const [dark , setDark] = useState(false)
    const number = useMemo(()=> newNum(count), [count]) 
    const darktheme = {
        backgroundColor : dark ? 'black' : 'white' ,
        color:  dark ? 'white' : 'black' 
    }
  return (
    <div>
        <button onClick={()=>setCount(count-1)}>-</button>
      {count}
        <button onClick={()=>setCount(count+1)}>+</button>
    <div>
        <button onClick={()=>setDark(!dark)}>{dark ? 'Light Theme' : 'Dark Theme'}</button>
    </div>
    <div style={darktheme}>
        {number}
    </div>

    </div>
  )
}

export default UseMemo

const newNum = (num) => {
    for(let i=0 ; i < 1000000000 ; i++)
    {

    }
    return num * 2
}