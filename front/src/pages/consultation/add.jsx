import { useEffect, useState } from 'react';
import axios from 'axios';

const AddConsultation = ()=>{
  const decode = JSON.parse(localStorage.getItem("decode"))
  const [doctorId, setDoctorId] = useState('')
  const [patientId, setPatientId] = useState('')
  const [consulDate, setConsulDate] = useState('')
  const [info, setInfo] = useState('')
  const [doctors, setDoctors] = useState([])
  const [message, setMessage] = useState('')
  
  const handleSubmit = (e)=>{
    e.preventDefault()

    const payload ={
        doctorId,
        patientId,
        consulDate,
        info
      }

      axios.post('http://localhost:8080/consultation', payload,{
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
        axios.get('http://localhost:8080/doctors',{
          headers : {
            'access_token': localStorage.getItem("token")
          }
        }).then((response)=>{
            setDoctors(response.data)
        }).catch((err) => console.log("err", err));
    },[])

    useEffect(()=>{
        axios.get(`http://localhost:8080/patient/user/${decode.id}`,{
          headers : {
            'access_token': localStorage.getItem("token")
          }
        }).then((response)=>{
            setPatientId(response.data.id)
        }).catch((err) => console.log("err", err));
    },[decode.id])

    return(
        <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card mb-3 text-center border-primary">
                  <div className="card-header">
                    Add Data Consultation
                  </div>
                <div className="card-body">
                {message?<div className="alert alert-success alert-dismissible fade show" role="alert">
                        {message}
                  <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={()=>{setMessage('')}}></button>
                </div>:false}
                    <form onSubmit={handleSubmit}>
                      <table className='table table-hover'>
                        <tbody>
                          <tr>
                            <td>Choose Doctor </td>
                            <td><select className='form-control' onChange={(e) => setDoctorId(e.target.value)} defaultValue={''} required>
                            <option value={''}>Pilih</option>
                            {
                                doctors.map((v, index)=>{
                                    return(
                                        <option key={index} value={v.id}>{v.name} {v.scheduleId}</option>
                                    )
                                })
                            }
                      </select>&nbsp;</td>
                          </tr>
                          <tr>
                            <td>Choose Date  </td>
                            <td><input type="date" className='form-control' onChange={(e) => setConsulDate(e.target.value)}/></td>
                          </tr>
                          <tr>
                            <td>Input Problem  </td>
                            <td><input type="text" className='form-control' onChange={(e) => setInfo(e.target.value)}/></td>
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
export default AddConsultation;