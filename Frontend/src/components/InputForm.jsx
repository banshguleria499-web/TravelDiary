import React, { useState } from 'react'
import axios from 'axios'
import "../styles/InputForm.css"

export default function InputForm({ setIsOpen }) {

  const [userName, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isSignUp, setIsSignUp] = useState(false)
  const [error, setError] = useState("")

  const handleOnSubmit = async (e) => {
  e.preventDefault()

  let endpoint = isSignUp ? "signUp" : "login"

  console.log("sending:", {
    endpoint,
    userName,
    email,
    password
  })

  try {
    const res = await axios.post(
      `http://localhost:3000/user/${endpoint}`,
      isSignUp
        ? { userName, email, password }
        : { email, password }
    )

    console.log("response:", res.data)

    localStorage.setItem("token", res.data.token)
    localStorage.setItem("user", JSON.stringify(res.data.user))

    setIsOpen()

  } catch (err) {
    console.log(err.response?.data)
    setError(err.response?.data?.error || "Something went wrong")
  }
}

  return (
    <div className='outer'>
      <form className='form' onSubmit={handleOnSubmit}>

    <div className="form-header">
          <span
            className="close-btn"
            onClick={() => setIsOpen(false)}
          >
            ×
          </span>
    </div>

        {isSignUp && (
          <div className='form-control'>
            <label>User Name</label>
            <input
              type="text"
              className='input'
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
        )}

        <div className='form-control'>
          <label>Email</label>
          <input
            type="email"
            className='input'
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className='form-control'>
          <label>Password</label>
          <input
            type="password"
            className='input'
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type='submit'>
          {(isSignUp) ? "Sign Up" : "Login"}
        </button>

        <br />

        {(error !== "") && <h6 className='error'>{error}</h6>}

        <br />

        <p
    className='login-para'
    onClick={(e) => {
      e.stopPropagation();
      setIsSignUp(prev => !prev);
    }}
  >
    {isSignUp
      ? "Already have an account? Login"
      : "Create new account"}
  </p>

      </form>
    </div>
  )
}