import {
  Login,
  Consultation,
  Profile,
  Register,
  Doctor,
  AddDoctor,
  AddConsultation,
  EditConsultation
} from './pages'
// import { EditConsultation } from './pages/consultation/edit.jsx'
import Navbar from './components/navbar';
import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {RequireAuth, AlreadyLogin, PatientCounter, DoctorCounter, AdminCounter} from './privateRoute';

function App() {
  return (
        <Router>
          <div className="container">
            <Navbar/>
           <div className="py-5">
              <Routes>
                <Route path="/login" element={<AlreadyLogin><Login/></AlreadyLogin>}></Route>
                <Route path="/register" element={<AlreadyLogin><Register/></AlreadyLogin>}></Route>
                <Route path="/" element={<RequireAuth><Consultation/></RequireAuth>}></Route>
                <Route path="/profile" element={<RequireAuth><Profile/></RequireAuth>}></Route>
                <Route path="/doctor" element={<RequireAuth><DoctorCounter><PatientCounter><Doctor/></PatientCounter></DoctorCounter></RequireAuth>}></Route>
                <Route path="/doctor/add" element={<RequireAuth><DoctorCounter><PatientCounter><AddDoctor/></PatientCounter></DoctorCounter></RequireAuth>}></Route>
                <Route path="/consultation/add" element={<RequireAuth><AdminCounter><DoctorCounter><AddConsultation/></DoctorCounter></AdminCounter></RequireAuth>}></Route>
                <Route path="/logout" element={<RequireAuth></RequireAuth>}></Route>
                <Route path="/consultation/edit/:id" element={<RequireAuth><EditConsultation/></RequireAuth>}></Route>
             </Routes>
          </div>         
        </div>
        </Router>
  );
}

export default App;
