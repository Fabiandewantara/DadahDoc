import { useState } from 'react';
import axios from 'axios';
import BackgroundLogin from "../../backgroundLogin.png"
import {Link} from 'react-router-dom';

const Register = ()=>{
  
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [birthPlace, setBirthPlace] = useState('')
  const [message, setMessage] = useState('')
  
  const handleSubmit = (e)=>{
    e.preventDefault()

    const payload ={
        username,
        password,
        role: 3,
        name,
        birthDate,
        birthPlace
      }

      axios.post('http://localhost:8080/register', payload).then((response)=>{
          setMessage("Data Registered please login")
          e.target.reset()
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
                  <h5 class="card-title">Register</h5>
                  {message?<div class="alert alert-success alert-dismissible fade show" role="alert">
                        {message}
                  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>:false}
                    <form onSubmit={handleSubmit}>
                      <div className="form-group p-1">
                        <input type="text" onChange={(e) => setUsername(e.target.value)} class="form-control" aria-describedby="emailHelp" placeholder="Enter Username"/>
                      </div>
                      <div className="form-group p-1">
                        <input type="password" onChange={(e) => setPassword(e.target.value)} class="form-control" aria-describedby="emailHelp" placeholder="Enter Password"/>
                      </div>
                      <div className="form-group p-1">
                        <input type="text" onChange={(e) => setName(e.target.value)} class="form-control" aria-describedby="emailHelp" placeholder="Enter Name"/>
                      </div>
                      <div className="form-group p-1">
                        <input type="date" onChange={(e) => setBirthDate(e.target.value)} class="form-control" aria-describedby="emailHelp" placeholder="Enter Date"/>
                      </div>
                      <div className="form-group p-1">
                        <input type="text" onChange={(e) => setBirthPlace(e.target.value)} class="form-control" aria-describedby="emailHelp" placeholder="Enter Date Place"/>
                      </div>
                        <button type="submit" class="btn btn-primary">Register</button>
                    </form>
                    <div className="pt-1">
                      <Link to="/login" style={{fontSize: "0.7rem"}}>Login Here!</Link>
                    </div>      
                </div>
              </div>
      </div>            
  </div>
        
    )
}
export default Register;