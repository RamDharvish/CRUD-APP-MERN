import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
function UpdateUser() {
    const{id}=useParams()
    const[name,setName]=useState()
    const[email,setEmail]=useState()
    const[age,setAge]=useState()
    const navigate=useNavigate() 

    
useEffect(()=> {
    axios.get('http://localhost:5000/getUser/'+id)
    .then(result =>{
        console.log(result)
        setName(result.data.name)
        setEmail(result.data.email)
        setAge(result.data.age)
    })
    .catch(err =>console.log(err))
  },[])


  const update=(e)=> {
    e.preventDefault()
    axios.put("http://localhost:5000/updateUser/"+id,{name,email,age})
        .then(result=>{
            console.log(result)
            navigate('/')
        })
        .catch(err=>console.log(err))
  }
  return (
    <div>
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <form onSubmit={update}>
                    <h2>Update User</h2>
                    <div className="mb-2">
                        <label htmlFor="">Name</label>
                        <input type="text" value={name} placeholder='Enter Your Name' className='form-control' 
                            onChange={(e)=>setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Email</label>
                        <input type="text" value={email} placeholder='Enter Your Email' className='form-control' 
                             onChange={(e)=>setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Age</label>
                        <input type="text" value={age} placeholder='Enter Your Age' className='form-control' 
                             onChange={(e)=>setAge(e.target.value)}
                        />
                    </div>
                    <button className="btn btn-success mt-2">Update</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default UpdateUser