import React, { useState } from 'react'
import '../pages/auth.form.scss'
import { Link, useNavigate} from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const Login = () => {

  const {loading,handleLogin} = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit=async(e)=>{
        e.preventDefault()
        await handleLogin({email, password})
        navigate('/')
  }
  if(loading){
    return <main><h1>Loading...</h1></main>
  }
  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type='email' name='email' onChange={(e)=>{setEmail(e.target.value)}} id='email' placeholder='Enter email address'/>
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type='password' name='password' onChange={(e)=>{setPassword(e.target.value)}} id='password' placeholder='Enter password'/>
            </div>
            <button type='submit' className="button primary-button">Login</button>
        </form>
         <p>Don't have an account? <Link to={"/register"}>Register</Link></p>
      </div>
    </main>
  )
}

export default Login
