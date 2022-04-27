import { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = ()=>{
    const [user, setUser] = useState('')
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
        axios.put(`http://localhost:8080/user/${decode.id}`, payload).then((response)=>{
            setMessage("Update Berhasil !!!")
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
        axios.put(`http://localhost:8080/doctor/${decode.id}`, payload).then((response)=>{
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
        axios.put(`http://localhost:8080/patient/${decode.id}`, payload).then((response)=>{
            setMessage("Update Berhasil !!!")
            e.target.reset()
        }).catch(function (error) {
          // handle error
          setMessage(error.response.data.message)
        }) 
    }

    useEffect(()=>{
        axios.get(`http://localhost:8080/user/${decode.id}`).then((response)=>{
            setUser(response.data.username)
        }).catch((err) => console.log("err", err));
    },[decode.id])

        useEffect(()=>{
            if(decode.role === 2){
                axios.get(`http://localhost:8080/doctor/user/${decode.id}`).then((response)=>{
                    setName(response.data.name)
                    setBirthDate(response.data.birthDate)
                    setBirthPlace(response.data.birthPlace)
                }).catch((err) => console.log("err", err));
            }else if (decode.role === 3){
                axios.get(`http://localhost:8080/patient/user/${decode.id}`).then((response)=>{
                    setName(response.data.name)
                    setBirthDate(response.data.birthDate)
                    setBirthPlace(response.data.birthPlace)
                }).catch((err) => console.log("err", err));   
            }
        },[decode.id, decode.role])
    

    const renderElement = ()=>{
        if(decode.role === 2){
            return<>
            <p>{message}</p>
            <form onSubmit={handleSubmitUpdateDoctor}>
                <input type="text" defaultValue={name} onChange={(e) => setName(e.target.value)} />
                <input type="date" defaultValue={birthDate} onChange={(e) => setBirthDate(e.target.value)}/>
                <input type="text" defaultValue={birthPlace} onChange={(e) => setBirthPlace(e.target.value)}/>
                <button type="submit">Edit</button>
            </form>
            </>
        }else if (decode.role === 3){
            return<>
            <p>{message}</p>
            <form onSubmit={handleSubmitUpdatePatient}>
                <input type="text" defaultValue={name} onChange={(e) => setName(e.target.value)} />
                <input type="date" defaultValue={birthDate} onChange={(e) => setBirthDate(e.target.value)}/>
                <input type="text" defaultValue={birthPlace} onChange={(e) => setBirthPlace(e.target.value)}/>
                <button type="submit">Edit</button>
            </form>
            </>
        }
    }

    return(
        <>
        <div className="row justify-content-header">
            <div className="col-md-12">
              <div className="card mb-3 text-center border-primary">
                  <div className="card-header">
                    User Card
                  </div>
                <div className="card-body">
                    <p>{message}</p>
                        <form onSubmit={handleSubmitUpdateUser}>
                            <input type="text" defaultValue={user} onChange={(e) => setUsername(e.target.value)} />
                            <input type="text" onChange={(e) => setPassword(e.target.value)}/>
                            <button type="submit">Edit</button>
                        </form>
                </div>
              </div>              
            </div>            
        </div>
        {decode.role !== 1?
            <div className="row justify-content-header">
                <div className="col-md-12">
                  <div className="card mb-3 text-center border-primary">
                      <div className="card-header">
                        Profile Card
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
