import { useState } from 'react';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom'
import {Link} from 'react-router-dom';
import jwtDecode from 'jwt-decode';

const Login = ()=>{
  
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e)=>{
    e.preventDefault()

    const payload ={
        username,
        password
      }

      axios.post('http://localhost:8080/login', payload).then((response)=>{
          localStorage.setItem("token", response.data.access_token)
          localStorage.setItem("decode", JSON.stringify(jwtDecode(localStorage.getItem("token"))))
          navigate("/")
          window.location.reload();
      }).catch(function (error) {
        // handle error
        setMessage(error.response.data.message)
      })

}
    return(
        <div className="row justify-content-header">
            <div className="col-md-12">
              <div className="card mb-3 text-center border-primary">
                  <div className="card-header">
                    Login Card
                  </div>
                <div className="card-body">
                    <p>{message}</p>
                    <form onSubmit={handleSubmit}>
                      <input type="text" onChange={(e) => setUsername(e.target.value)} />
                      <input type="text" onChange={(e) => setPassword(e.target.value)}/>
                      <button type="submit">Login</button>
                    </form>
                    <Link className='navbar-brand' to="/register" style={{fontSize: "15px"}}>Register Patient</Link>
                </div>
              </div>              
            </div>            
        </div>
    )
}
export default Login;