import React,{useState} from 'react'
 
function MyForm() {
    const [userData , setUserData] = useState({name:'',email:'',address:'',phone:'',ack:false})
const [show,setShow]=useState(false);
const onSubmit = () =>{
    if(userData.ack){
        setShow(true)
    }
    else{setShow(false) }
 
}
  return (
    <>
    <div>
        <div>
        <input type='text' placeholder='Name' onChange={
            (e) => setUserData((preValue) => {
                return preValue= {...preValue ,name : e.target.value}
            })
        }/>
        </div>
        <div>
        <input type='email' placeholder='Email' onChange={
            (e) => setUserData((preValue) => {
                return preValue= {...preValue ,email : e.target.value}
            })
        }/>
        </div>
        <div>
        <input type='text' placeholder='Address' onChange={
            (e) => setUserData((preValue) => {
                return preValue= {...preValue ,address : e.target.value}
            })
        }/>
        </div>
        <div>
        <input type='text' placeholder='phone number' onChange={
            (e) => setUserData((preValue) => {
                return preValue= {...preValue ,phone : e.target.value}
            })
        }/>
        </div>
        <div>
        <label>check me</label>
        <input type='checkbox' onChange={(e) => setUserData((preValue) =>           {
                return preValue= {...preValue ,ack : e.target.checked}
            })} value={userData.ack}/>
        </div>
        <button onClick={onSubmit}>Submit</button>
       
    </div>
   
{(show === true) ? <div>
        <div>Display Data:</div>
        <p>{userData.name}</p>
        <p>{userData.email}</p>
        <p>{userData.address}</p>
        <p>{userData.phone}</p>
        </div>
        :''}
    </>
  )
}
 
export default MyForm