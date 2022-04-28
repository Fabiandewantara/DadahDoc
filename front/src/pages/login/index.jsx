import { useState } from 'react';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom'
import {Link} from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import BackgroundLogin from "../../backgroundLogin.png"

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
           <img src={BackgroundLogin} width="200" height="650" className="d-inline-block align-top"  alt=""/>
            <div className="col-sm-7">
                    <p>{message}</p>
                    <form onSubmit={handleSubmit} class="card">
                    <div class="form-group">
                      <div class="username">
                      <label for="exampleInputEmail1" class="usernameLabel">Username</label>
                      </div>
                      <div class="inputUsername">
                      <input type="text" onChange={(e) => setUsername(e.target.value)} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Username"/>
                      </div>
                    </div>
                    <div class="form-group">
                      <div class="pass">
                      <label for="exampleInputEmail1" class="passwordLabel">Password</label>
                      </div>
                      <div class="inputPass">
                      <input type="password" onChange={(e) => setPassword(e.target.value)} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Password"/>
                      </div>
                    </div>
                    <div class="btn">
                      <button type="submit" class="btnPrimary">Login</button>
                    </div>
                    <div class="register">
                      <Link className='navbar-brand' to="/register" style={{fontSize: "15px"}}>Register Here if you don't have account!</Link>       
                    </div>
                    </form>  
            </div>            
        </div>

    )
}
export default Login;