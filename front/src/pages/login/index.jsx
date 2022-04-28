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
        <div className="row justify-content-center">
            <div className="col-md-4">
                    <div class="card justify-content-center" style={{width: "20rem"}}>
                    <img src={BackgroundLogin} class="card-img-top"  alt=""/>
                      <div class="card-body text-center">
                        <h5 class="card-title">Login</h5>
                              <p>{message}</p>
                          <form onSubmit={handleSubmit}>
                            <div className="form-group p-1">
                              <input type="text" onChange={(e) => setUsername(e.target.value)} class="form-control" aria-describedby="emailHelp" placeholder="Enter Username"/>
                            </div>
                            <div className="form-group p-1">
                              <input type="password" onChange={(e) => setPassword(e.target.value)} class="form-control" aria-describedby="emailHelp" placeholder="Enter Password"/>
                            </div>
                              <button type="submit" class="btn btn-primary">Login</button>
                          </form>
                          <div className="pt-1">
                            <strong><Link className='navbar-brand pt-5' to="/register" style={{fontSize: "0.7rem"}}>Register Here if you don't have account!</Link></strong>
                          </div>      
                      </div>
                    </div>
            </div>            
        </div>

    )
}
export default Login;