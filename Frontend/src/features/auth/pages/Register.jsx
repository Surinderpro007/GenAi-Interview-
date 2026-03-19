import React, { useState } from 'react'
import {useNavigate, Link} from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const Register = () => {
  const navigate = useNavigate()
  
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const {loading, handleRegister} = useAuth()


    const handleSubmit=async(e)=>{
        e.preventDefault()
        await handleRegister({username, email, password})
        navigate('/')
  }
  if(loading){
    return <main><h1>Loading...</h1></main>
  }


  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input type='text' name='username' onChange={(e)=>{setUsername(e.target.value)}} id='username' placeholder='Enter username'/>
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type='email' name='email' onChange={(e)=>{setEmail(e.target.value)}} id='email' placeholder='Enter email address'/>
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type='password' name='password' onChange={(e)=>{setPassword(e.target.value)}} id='password' placeholder='Enter password'/>
            </div>
            <button className="button primary-button">Register</button>
        </form>
        <p>Already have and account? <Link to={"/login"}>Login</Link></p>
      </div>
    </main>
  )
}

export default Register
