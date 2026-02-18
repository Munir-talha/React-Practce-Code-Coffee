import React from 'react'

const Async = () => {
    // Simple Async Function
    // async function test (){
    //     return 5
    // }
    // console.log(test())
    // Async arrow function

    const getUsers = async() =>{
        const users = await fetch('https://jsonplaceholder.typicode.com/users');
        const photos =  await fetch('https://jsonplaceholder.typicode.com/photos');
        const photosData = await photos.json()
        const userData = await users.json()
        console.log("users:", userData)
    }
    getUsers();

  return (
    <div>Async</div>
  )
}

export default Async