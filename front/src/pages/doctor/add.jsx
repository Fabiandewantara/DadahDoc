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
        <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card mb-3 text-center border-primary">
                  <div className="card-header">
                    Doctor Registration
                  </div>
                <div className="card-body">
                    <p>{message}</p>
                    <form onSubmit={handleSubmit}>
                      <table className='table table-hover'>
                        <tbody>
                          <tr>
                            <td>Username  </td>
                            <td><input type="text" className='form-control' onChange={(e) => setUsername(e.target.value)} /></td>
                          </tr>
                          <tr>
                            <td>Password  </td>
                            <td><input type="text" className='form-control' onChange={(e) => setPassword(e.target.value)}/></td>
                          </tr>
                          <tr>
                            <td>Name  </td>
                            <td><input type="text" className='form-control' onChange={(e) => setName(e.target.value)}/></td>
                          </tr>
                          <tr>
                            <td>Birth Date  </td>
                            <td><input type="date" className='form-control' onChange={(e) => setBirthDate(e.target.value)} /></td>
                          </tr>
                          <tr>
                            <td>Birth Place  </td>
                            <td><input type="text" className='form-control' onChange={(e) => setBirthPlace(e.target.value)}/></td>
                          </tr>
                          <tr>
                            <td>Schedules </td>
                            <td>
                              <select className='form-control' onChange={(e) => setScheduleId(e.target.value)} defaultValue={''} required>
                              <option value={''}>Pilih</option>
                              {
                                  schedules.map((v, index)=>{
                                      return(
                                          <option key={index} value={v.id}>{v.schedule}</option>
                                      )
                                  })
                              }
                              </select>&nbsp;
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <button className='btn btn-outline-info' type="submit">Add</button>
                    </form>
                </div>
              </div>              
            </div>            
        </div>
    )
}
export default AddDoctor;