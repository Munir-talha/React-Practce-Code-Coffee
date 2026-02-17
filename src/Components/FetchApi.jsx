import React, { useEffect, useState } from 'react'

function FetchApi() {
  const [isRender , setRender] = useState(true)
  const [count , setCount] = useState(0)
  const [payload , setPayload] = useState("albumss")
  const [data , setData] = useState([])
    // useEffect(()=>{
    //   //Mounting Phase
    //     console.log(`Mount `)

    //     //Unmount Phase or Cleanup Functions
    //   return ()=>{
    //     console.log(`unMount`)
    //   }
    //     //Updating Phase
    // },[count])


    //Fetching Api using UseEffect
    useEffect(()=>{
      fetch(`https://jsonplaceholder.typicode.com/${payload}`)
      .then(response => response.json())
      .then(json => setData(json)).catch((e)=>console.log("An error has occured " , e))
    },[payload])
  return (
    <div>
      <button onClick={()=>setPayload("posts")}>Posts</button>
      <button onClick={()=>setPayload("comments")}>Comments</button>
      <button onClick={()=>setPayload("albums")}>Albums</button>
      <button onClick={()=>setCount(count+1)}>Count</button>
      {data.map((item)=><div>{item.title ? item.title : item.body}</div>)}


    </div>

  )
}

export default FetchApi
