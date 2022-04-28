import { useEffect, useState } from 'react';
import jwtDecode from "jwt-decode";
import axios from 'axios';
import Table from '../../components/table';

const EditConsultation = ()=>{
    const [consuls, setConsuls] = useState([])
    const [message, setMessage] = useState('')
    const [doctorId, setDoctorId] = useState('')
    const [consulDate, setConsulDate] = useState('')
    const [info, setInfo] = useState('')
    const decode = jwtDecode(localStorage.getItem("token"))
    const columns = [
        'Id',
        'doctor Id',
        'Patient Id',
        'Consul Date',
        'Info'
      ]

      const handleUpdate = (e)=>{
          e.preventDefault()

          const payload = {
              doctorId,
              consulDate,
              info
          }

          axios.put(`http://localhost:8080/consultation/${decode.id}`).then((response)=>{
              setMessage("Update Consul Success!!!")
              e.target.reset()
          }).catch(function (error){
              // handle error
              setMessage(error.response.data.message)
          })
      }

      useEffect(()=>{
          axios.get(`http://localhost:8080/consultations/patient/${decode.id}`).then((response)=>{
              setConsuls(response.data)
          }).catch((err) => console.log("err", err));
      },[])


      return(
        <>
        <div className="row justify-content-header">
            <div className="col-md-12">
              <div className="card mb-3 text-center border-primary">
                  <div className="card-header">
                    Consultation Edit
                  </div>
                <div className="card-body">
                    <p>{message}</p>
                        <form onSubmit={handleUpdate}>
                            <input type="text" defaultValue={doctorId} onChange={(e) => setDoctorId(e.target.value)}/>
                            <input type="date" defaultValue={consulDate} onChange={(e) => setConsulDate(e.target.value)}/>
                            <input type="text" defaultValue={info} onChange={(e) => setInfo(e.target.value)}/>
                            <button type="submit">Edit</button>
                        </form>
                </div>
              </div>              
            </div>            
        </div>
        </>
      )
}

export default EditConsultation;

