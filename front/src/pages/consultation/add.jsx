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

      axios.post('http://localhost:8080/consultation', payload).then((response)=>{
          setMessage("Data Added !!!")
          e.target.reset()
      }).catch(function (error) {
        // handle error
          setMessage("Username Already Exis")
      })    
    }
    useEffect(()=>{
        axios.get('http://localhost:8080/doctors').then((response)=>{
            setDoctors(response.data)
        }).catch((err) => console.log("err", err));
    },[])

    useEffect(()=>{
        axios.get(`http://localhost:8080/patient/user/${decode.id}`).then((response)=>{
            setPatientId(response.data.id)
        }).catch((err) => console.log("err", err));
    },[decode.id])

    return(
        <div className="row justify-content-header">
            <div className="col-md-12">
              <div className="card mb-3 text-center border-primary">
                  <div className="card-header">
                    Add Doctor Card
                  </div>
                <div className="card-body">
                    <p>{message}</p>
                    <form onSubmit={handleSubmit}>
                      <select onChange={(e) => setDoctorId(e.target.value)} defaultValue={''} required>
                            <option value={''}>Pilih</option>
                            {
                                doctors.map((v, index)=>{
                                    return(
                                        <option key={index} value={v.id}>{v.name} {v.scheduleId}</option>
                                    )
                                })
                            }
                      </select>&nbsp;
                      <input type="date" onChange={(e) => setConsulDate(e.target.value)} />
                      <input type="text" onChange={(e) => setInfo(e.target.value)}/>
                      <button type="submit">Add</button>
                    </form>
                </div>
              </div>              
            </div>            
        </div>
    )
}
export default AddConsultation;