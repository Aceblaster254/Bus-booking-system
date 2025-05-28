import {React, useState} from 'react'
import './LogIn.css'


function Login({handleLogin}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] =useState('')
  const [adminNo, setAdminNo] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  }
  return (
    <>
    {/* <div className="container">
            <img src={Adventour} alt="logo" />
    </div> */}
    <div className='login'>
        <form onSubmit={handleSubmit}>
          <h1>LOG IN</h1>
          <div className='form'>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required/>
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
          </div>
            <br />
          <div className='btn'>
            <button type="submit">LOGIN</button>

            <button type="submit">ADMIN LOGIN
                <div className='form-'>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required/>
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
            <input type="text, password" placeholder="Admin No" value={adminNo} onChange={(e) => setAdminNo(e.target.value)} required/>
          </div>
            </button>
          </div>
        </form>
    </div>
    </>
  )
}

export default Login;