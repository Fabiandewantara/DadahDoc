import { useEffect, useState } from 'react';
import axios from 'axios';
import Table from '../../components/table';

const Doctor = ()=>{
    const [doctors, setDoctors] = useState([])
    const [message, setMessage] = useState('')
    const columns = [
        'Id',
        'Name',
        'Birth Date',
        'Birth Place',
        'Schedule Id',
        'user Id'
      ]

      const handleDelete = (id)=>{
        axios.delete(`http://localhost:8080/doctor/${id}`).then((response)=>{
            window.location.reload()
            setMessage("Berhasil Delete !!!")
        }).catch((err) => console.log("err", err));
      }

      useEffect(()=>{
        axios.get('http://localhost:8080/doctors').then((response)=>{
            setDoctors(response.data)
        }).catch((err) => console.log("err", err));
    },[])

    return(
        <div className="row justify-content-header">
            <div className="col-md-12">
              <div className="card mb-3 text-center border-primary">
                  <div className="card-header">
                    Doctor Card
                  </div>
                <div className="card-body">
                    <p>{message}</p>
                  <Table
                  columns = {columns}
                  datas = {doctors}
                  onDelete = {handleDelete}
                  type = "doctor"
                />
                </div>
              </div>              
            </div>            
        </div>
    )
}

export default Doctor;
