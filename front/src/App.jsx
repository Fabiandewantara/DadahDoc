import {
  Login,
  Consultation,
  Profile,
  Register,
  Doctor,
  AddDoctor,
  AddConsultation
} from './pages'
import Navbar from './components/navbar';
import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {RequireAuth, AlreadyLogin} from './privateRoute';

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
                <Route path="/doctor" element={<RequireAuth><Doctor/></RequireAuth>}></Route>
                <Route path="/doctor/add" element={<RequireAuth><AddDoctor/></RequireAuth>}></Route>
                <Route path="/consultation/add" element={<RequireAuth><AddConsultation/></RequireAuth>}></Route>
                <Route path="/logout" element={<RequireAuth></RequireAuth>}></Route>
             </Routes>
          </div>         
        </div>
        </Router>
  );
}

export default App;
