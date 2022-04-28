import { useEffect, useState } from 'react';
import axios from 'axios';

const AddDoctor = ()=>{
  
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [birthPlace, setBirthPlace] = useState('')
  const [scheduleId, setScheduleId] = useState('')
  const [schedules, setSchedules] = useState([])
  const [message, setMessage] = useState('')
  
  const handleSubmit = (e)=>{
    e.preventDefault()

    const payload ={
        username,
        password,
        role: 2,
        name,
        birthDate,
        birthPlace,
        scheduleId
      }

      axios.post('http://localhost:8080/register', payload,{
        headers : {
          'access_token': localStorage.getItem("token")
        }
      }).then((response)=>{
          setMessage("Data Added !!!")
          e.target.reset()
      }).catch(function (error) {
        // handle error
          setMessage("Username Already Exis")
      })    
    }
    useEffect(()=>{
        axios.get('http://localhost:8080/schedules',{
          headers : {
            'access_token': localStorage.getItem("token")
          }
        }).then((response)=>{
            setSchedules(response.data)
        }).catch((err) => console.log("err", err));
    },[])

    return(
        <div className="row justify-content-header">
            <div className="col-md-12">
              <div className="card mb-3 text-center border-primary">
                  <div className="card-header">
                    Add Doctor Card
                  </div>
                <div className="card-body">
                {message?<div class="alert alert-success alert-dismissible fade show" role="alert">
                        {message}
                  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>:false}
                    <form onSubmit={handleSubmit}>
                      <input type="text" onChange={(e) => setUsername(e.target.value)} />
                      <input type="text" onChange={(e) => setPassword(e.target.value)}/>
                      <input type="text" onChange={(e) => setName(e.target.value)}/>
                      <input type="date" onChange={(e) => setBirthDate(e.target.value)} />
                      <input type="text" onChange={(e) => setBirthPlace(e.target.value)}/>
                      <select onChange={(e) => setScheduleId(e.target.value)} defaultValue={''} required>
                            <option value={''}>Pilih</option>
                            {
                                schedules.map((v, index)=>{
                                    return(
                                        <option key={index} value={v.id}>{v.schedule}</option>
                                    )
                                })
                            }
                      </select>&nbsp;
                      <button type="submit">Add</button>
                    </form>
                </div>
              </div>              
            </div>            
        </div>
    )
}
export default AddDoctor;