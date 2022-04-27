import { useState } from 'react';
import axios from 'axios';

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
        <div className="row justify-content-header">
            <div className="col-md-12">
              <div className="card mb-3 text-center border-primary">
                  <div className="card-header">
                    Register Card
                  </div>
                <div className="card-body">
                    <p>{message}</p>
                    <form onSubmit={handleSubmit}>
                      <input type="text" onChange={(e) => setUsername(e.target.value)} />
                      <input type="text" onChange={(e) => setPassword(e.target.value)}/>
                      <input type="text" onChange={(e) => setName(e.target.value)}/>
                      <input type="date" onChange={(e) => setBirthDate(e.target.value)} />
                      <input type="text" onChange={(e) => setBirthPlace(e.target.value)}/>
                      <button type="submit">Register</button>
                    </form>
                </div>
              </div>              
            </div>            
        </div>
    )
}
export default Register;