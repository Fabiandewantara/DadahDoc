import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import Logo from "../logonavbar.png"
import jwtDecode from "jwt-decode";

const Navbar = ()=>{
    let [decode, setDecode] = useState({
        id: 0,
        username: "", 
        role: 0})

    useEffect(()=>{
    
        if(localStorage.getItem("token")){
            setDecode(jwtDecode(localStorage.getItem("token")))
        }else{
            setDecode({
                id: 0, 
                role: 0})
        }
    },[])
    return (
        <nav className="navbar navbar-expand-lg  navbar-light bg-light">
             <Link className='navbar-brand px-3' to="/login"><p className="font-weight-bold">DADAH DOC</p></Link>
        <div className="navbar-item px-3 collapse navbar-collapse">
        </div>
        {decode.role === 1 || decode.role === 2 || decode.role === 3 ? 
            <>
            <Link className='navbar-brand px-3' to="/" exact = "true" style={{fontSize: "15px"}}>Consultation</Link>        
            {decode.role ===1 ? 
                <Link className='navbar-brand' to="/doctor" exact = "true" style={{fontSize: "15px"}}>Doctor</Link>:false}
            <Link className='navbar-brand' to="/profile" style={{fontSize: "15px"}}>Profile</Link>
            <Link className='navbar-brand' to="/login" style={{fontSize: "15px"}} onClick={()=>{localStorage.clear();  window.location.reload(); }}>Logout</Link></>
         :
         <span className='navbar-brand mb-0'>
         <img src={Logo} width="50" height="50" className="d-inline-block align-top"  alt=""></img> {decode.username}
       </span>}
        </nav>
    )
}

export default Navbar