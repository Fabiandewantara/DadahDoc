import { useEffect, useState } from 'react';
import axios from 'axios';
import Table from '../../components/table';

const Doctor = ()=>{
    const [doctors, setDoctors] = useState([])
    const [message, setMessage] = useState('')
    const columns = [
        'No',
        'Name',
        'Birth Date',
        'Birth Place',
        'Schedule Time',
        'Username'
      ]

      const handleDelete = (id)=>{
        axios.delete(`http://localhost:8080/doctor/${id}`,{
          headers : {
            'access_token': localStorage.getItem("token")
          }
        }).then((response)=>{
            window.location.reload()
            setMessage("Data Berhasil Delete !!!")
        }).catch((err) => console.log("err", err));
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

    return(
        <div className="row justify-content-header">
            <div className="col-md-12">
              <div className="card mb-3 text-center border-primary">
                  <div className="card-header">
                    Data Doctor
                  </div>
                <div className="card-body">
                {message?<div className="alert alert-success alert-dismissible fade show" role="alert">
                        {message}
                  <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={()=>{setMessage('')}}></button>
                </div>:false}
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
