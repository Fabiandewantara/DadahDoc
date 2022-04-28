import { useState } from 'react';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom'
import {Link} from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import BackgroundLogin from "../../backgroundLogin.png";

const Login = () => {

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
                    <div className="card justify-content-center" style={{width: "20rem"}}>
                    <img src={BackgroundLogin} className="card-img-top"  alt=""/>
                      <div className="card-body text-center">
                        <h5 className="card-title">Login</h5>
                        {message?<div class="alert alert-danger alert-dismissible fade show" role="alert">
                        {message}
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={()=>{setMessage('')}}></button>
                        </div>:false}
                          <form onSubmit={handleSubmit}>
                            <div className="form-group p-1">
                              <input type="text" required onChange={(e) => setUsername(e.target.value)} className="form-control" aria-describedby="emailHelp" placeholder="Enter Username"/>
                            </div>
                            <div className="form-group p-1">
                              <input type="password" required onChange={(e) => setPassword(e.target.value)} className="form-control" aria-describedby="emailHelp" placeholder="Enter Password"/>
                            </div>
                              <button type="submit" className="btn btn-primary">Login</button>
                          </form>
                          <div className="pt-1">
                            <Link to="/register" style={{fontSize: "0.7rem"}}>Register Here if you don't have account!</Link>
                          </div>      
                      </div>
                    </div>
            </div>            
        </div>

    )
}
export default Login;