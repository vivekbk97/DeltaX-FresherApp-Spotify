import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { toast, ToastContainer } from 'react-toastify'

const LoginPage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const navigate = useNavigate()

  const loginHandler = async () => {
    if (!name || !email) {
      toast('Please enter all the fields', {
        position: 'bottom-center',
        autoClose: 2000
      })
      return
    }
    const body = {
      name: name,
      email: email
    }

    await fetch('/user/login', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          toast.error(data.error, {
            position: 'bottom-center',
            autoClose: 2000
          })
        } else {
          localStorage.setItem('user', JSON.stringify(data))
          toast.success('Login Successful', {
            position: 'bottom-center',
            autoClose: 2000
          })
          navigate('/home')
        }
      })
  }

  return (
    <div>
      <div>
        <b>Name</b>
        <input
          type='text'
          className='input'
          value={name}
          onChange={e => {
            setName(e.target.value)
          }}
          required
        />
      </div>
      <div>
        <b>Email</b>
        <input
          type='email'
          className='input'
          value={email}
          onChange={e => {
            setEmail(e.target.value)
          }}
          required
        />
      </div>
      <button className='login' onClick={() => loginHandler()}>
        Login
      </button>
      <ToastContainer />
    </div>
  )
}

export default LoginPage
