import React from 'react'

function Button({props}) {
    console.log(props)
  return (
    <div style={{backgroundColor:'black' , color:'white', padding:'20px', border:'1px solid white'}}>
      <span>{props.name}</span>
    </div>
  )
}

export default Button
