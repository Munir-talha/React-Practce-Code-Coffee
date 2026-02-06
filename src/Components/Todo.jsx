import React, { useState } from 'react'

function Todo() {
    const [allTodo , setAllTodo] = useState([])
    const [todo , setTodo] = useState("")
    const onAdd = () =>{
        // setAllTodo([...allTodo , todo])  Nusrat Shb 
        //storing all previous and new todo inside the allTodo
        setAllTodo((preValue)=>preValue = [...preValue , todo])

        //making input field empty on every add btn
        setTodo("")
    }
  return (
    <div>
        <input type='text' value={todo} onChange={(e)=>setTodo(e.target.value)}/>
        <button onClick={onAdd}>Add</button>
        <ul>
        {allTodo.map((cur,index)=>
        <li key={index}>{cur}</li>
        )}
        </ul>
    </div>
  )
}

export default Todo
