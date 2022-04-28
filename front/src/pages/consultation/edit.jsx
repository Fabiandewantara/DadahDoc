import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditConsultation = () => {
    const [message, setMessage] = useState('')
    const [doctorId, setDoctorId] = useState('')
    const [consulDate, setConsulDate] = useState('')
    const [info, setInfo] = useState('')
    const [doctors, setDoctors] = useState([])
    let { id } = useParams();


    const handleUpdate = (e) => {
        e.preventDefault()

        const payload = {
            doctorId,
            consulDate,
            info
        }

        axios.put(`http://localhost:8080/consultation/${id}`, payload, {
            headers: {
                'access_token': localStorage.getItem("token")
            }
        }).then((response) => {
            setMessage("Update Consul Success!!!")
            e.target.reset()
        }).catch(function (error) {
            // handle error
            setMessage(error.response.data.message)
        })
    }

    useEffect(() => {
        axios.get('http://localhost:8080/doctors', {
            headers: {
                'access_token': localStorage.getItem("token")
            }
        }).then((response) => {
            setDoctors(response.data)
        }).catch((err) => console.log("err", err));
    }, [])


    useEffect(() => {
        axios.get(`http://localhost:8080/consultation/${id}`, {
            headers: {
                'access_token': localStorage.getItem("token")
            }
        }).then((response) => {
            setDoctorId(response.data.doctorId)
            setConsulDate(response.data.consulDate)
            setInfo(response.data.info)


        }).catch((err) => console.log("err", err));
    }, [id])


    return (
        <>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card mb-3 text-center border-primary">
                        <div className="card-header">
                            Consultation Edit
                        </div>
                        <div className="card-body">
                            <p>{message}</p>
                            <form onSubmit={handleUpdate}>
                                <table className='table table-hover'>
                                    <tbody>
                                        <tr>
                                            <td>Doctor</td>
                                            <td><select className='form-control' value={doctorId} onChange={(e) => setDoctorId(e.target.value)} required>
                                                <option value={''}>Pilih</option>
                                                {
                                                    doctors.map((v, index) => {
                                                        return (
                                                            <option key={index} value={v.id}>{v.name} {v.scheduleId}</option>
                                                        )
                                                    })
                                                }
                                            </select></td>

                                        </tr>
                                        <tr>
                                            <td>Date</td>
                                            <td><input className='form-control' type="date" defaultValue={consulDate} onChange={(e) => setConsulDate(e.target.value)} /></td>

                                        </tr>
                                        <tr>
                                            <td>Problem</td>
                                            <td><input className='form-control' type="text" defaultValue={info} onChange={(e) => setInfo(e.target.value)} /></td>

                                        </tr>
                                    </tbody>
                                </table>
                                <button className='btn btn-outline-info' type="submit">Edit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditConsultation;

