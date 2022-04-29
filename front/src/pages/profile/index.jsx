import { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = ()=>{
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [name, setName] = useState('')
    const [birthDate, setBirthDate] = useState('')
    const [birthPlace, setBirthPlace] = useState('')
    const decode = JSON.parse(localStorage.getItem("decode"))

    const handleSubmitUpdateUser = (e)=>{
        e.preventDefault()

        const payload = {
            username,
            password
        }
        axios.put(`http://localhost:8080/user/${decode.id}`, payload,{
            headers : {
              'access_token': localStorage.getItem("token")
            }
          }).then((response)=>{
            setMessage("Update Berhasil !!!")
            decode.username = username
            localStorage.setItem("decode", JSON.stringify(decode))
            setTimeout(()=>{window.location.reload()},700);
        }).catch(function (error) {
          // handle error
          setMessage(error.response.data.message)
        }) 
    }

    const handleSubmitUpdateDoctor = (e)=>{
        e.preventDefault()

        const payload = {
            name,
            birthDate,
            birthPlace
        }
        axios.put(`http://localhost:8080/doctor/${decode.id}`, payload,{
            headers : {
              'access_token': localStorage.getItem("token")
            }
          }).then((response)=>{
            setMessage("Update Berhasil !!!")
            e.target.reset()
        }).catch(function (error) {
          // handle error
          setMessage(error.response.data.message)
        }) 
    }

    const handleSubmitUpdatePatient = (e)=>{
        e.preventDefault()

        const payload = {
            name,
            birthDate,
            birthPlace
        }
        axios.put(`http://localhost:8080/patient/${decode.id}`, payload,{
            headers : {
              'access_token': localStorage.getItem("token")
            }
          }).then((response)=>{
            setMessage("Update Berhasil !!!")
            e.target.reset()
        }).catch(function (error) {
          // handle error
          setMessage(error.response.data.message)
        }) 
    }

    useEffect(()=>{
        axios.get(`http://localhost:8080/user/${decode.id}`,{
            headers : {
              'access_token': localStorage.getItem("token")
            }
          }).then((response)=>{
            setUsername(response.data.username)
        }).catch((err) => console.log("err", err));
    },[decode.id])

        useEffect(()=>{
            if(decode.role === 2){
                axios.get(`http://localhost:8080/doctor/user/${decode.id}`,{
                    headers : {
                      'access_token': localStorage.getItem("token")
                    }
                  }).then((response)=>{
                    setName(response.data.name)
                    setBirthDate(response.data.birthDate)
                    setBirthPlace(response.data.birthPlace)
                }).catch((err) => console.log("err", err));
            }else if (decode.role === 3){
                axios.get(`http://localhost:8080/patient/user/${decode.id}`,{
                    headers : {
                      'access_token': localStorage.getItem("token")
                    }
                  }).then((response)=>{
                    setName(response.data.name)
                    setBirthDate(response.data.birthDate)
                    setBirthPlace(response.data.birthPlace)
                }).catch((err) => console.log("err", err));   
            }
        },[decode.id, decode.role])
    

    const renderElement = ()=>{
        if(decode.role === 2){
            return<>
            <form onSubmit={handleSubmitUpdateDoctor}>
            <table className='table table-hover'>
                <tbody>
                  <tr>
                    <td>Name</td>
                    <td><input className='form-control' type="text" defaultValue={name} onChange={(e) => setName(e.target.value)} /></td>
                  </tr>
                  <tr>
                    <td>Birth Date</td>
                    <td><input className='form-control' type="date" defaultValue={birthDate} onChange={(e) => setBirthDate(e.target.value)}/></td>
                  </tr>
                  <tr>
                    <td>Birth Place</td>
                    <td><input className='form-control' type="text" defaultValue={birthPlace} onChange={(e) => setBirthPlace(e.target.value)}/></td>
                  </tr>
                </tbody>
              </table>               
                <button className='btn btn-outline-info' type="submit">Edit</button>
            </form>
            </>
        }else if (decode.role === 3){
            return<>
            <form onSubmit={handleSubmitUpdatePatient}>
              <table className='table table-hover'>
                <tbody>
                  <tr>
                    <td>Name</td>
                    <td><input className='form-control' type="text" defaultValue={name} onChange={(e) => setName(e.target.value)} /></td>
                  </tr>
                  <tr>
                    <td>Birth Date</td>
                    <td><input className='form-control' type="date" defaultValue={birthDate} onChange={(e) => setBirthDate(e.target.value)}/></td>
                  </tr>
                  <tr>
                    <td>Birth Place</td>
                    <td><input className='form-control' type="text" defaultValue={birthPlace} onChange={(e) => setBirthPlace(e.target.value)}/></td>
                  </tr>
                </tbody>
              </table>               
                <button className='btn btn-outline-info' type="submit">Edit</button>
            </form>
            </>
        }
    }

    return(
        <>
        <div className="row justify-content-center">
            <div className="col-md-6">
              {message?<div className="alert alert-success alert-dismissible fade show" role="alert">
                        {message}
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>:false}
              <div className="card mb-3 text-center border-primary">
                  <div className="card-header">
                    User Account
                  </div>
                <div className="card-body">
                        <form onSubmit={handleSubmitUpdateUser}>
                          <table className='table table-hover'>
                            <tbody>
                              <tr>
                                <td>Set New Username</td>
                                <td><input className='form-control' required type="text" defaultValue={username} onChange={(e) => setUsername(e.target.value)} /></td>
                              </tr>
                              <tr>
                                <td>Set New Password</td>
                                <td><input className='form-control' required type="password" onChange={(e) => setPassword(e.target.value)}/></td>
                              </tr>
                            </tbody>
                          </table>                            
                          <button className='btn btn-outline-info' type="submit">Edit</button>
                        </form>
                </div>
              </div>              
            </div>            
        </div>
        {decode.role !== 1?
            <div className="row justify-content-center">
                <div className="col-md-6">
                  <div className="card mb-3 text-center border-primary">
                      <div className="card-header">
                        User Profile
                      </div>
                    <div className="card-body">
                        {renderElement()}
                    </div>
                  </div>              
                </div>            
            </div>:false}
        </>
    )
}

export default Profile;