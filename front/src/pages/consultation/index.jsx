import { useEffect, useState } from 'react';
import jwtDecode from "jwt-decode";
import axios from 'axios';
import Table from '../../components/table';

const Consultation = ()=>{
    const decode = jwtDecode(localStorage.getItem("token"))
    const [consuls, setConsuls] = useState([])
    const [message, setMessage] = useState('')
    const columns = [
        'Id',
        'doctor Id',
        'Patient Id',
        'Consul Date',
        'Info'
      ]

      const handleDelete = (id)=>{
            axios.delete(`http://localhost:8080/consultation/${id}`).then((response)=>{
              window.location.reload()
              setMessage("Berhasil Delete !!!")
          }).catch((err) => console.log("err", err));
      }

      useEffect(()=>{
          let url = null
        if(decode.role === 2){
            url = 'http://localhost:8080/consultations/doctor/'+decode.id
        }else if (decode.role === 3){
            url = 'http://localhost:8080/consultations/patient/'+decode.id
        }
        else if (decode.role === 1){
            url = 'http://localhost:8080/consultations/admin/'+decode.id
        }
        axios.get(`${url}`).then((response)=>{
            setConsuls(response.data)
        }).catch((err) => console.log("err", err));
    },[decode.role,decode.id])

    return(
        <div className="row justify-content-header">
            <div className="col-md-12">
              <div className="card mb-3 text-center border-primary">
                  <div className="card-header">
                    Consultation Card
                  </div>
                <div className="card-body">
                  <p>{message}</p>
                  <Table
                  columns = {columns}
                  datas = {consuls}
                  onDelete = {handleDelete}
                  type = "consultation"
                />
                </div>
              </div>              
            </div>            
        </div>
    )
}

export default Consultation;
