import React from 'react'
import { Navigate } from 'react-router-dom'

const RequireAuth = ({ children }) => {
  return localStorage.getItem("token")? children : <Navigate to="/login" replace />;
}
const AlreadyLogin = ({ children }) => {

    return localStorage.getItem("token")? <Navigate to="/" replace /> : children;
  }
const AdminCounter = ({ children }) => {
    return JSON.parse(localStorage.getItem("decode")).role === 1? <Navigate to="/" replace /> : children  ;
    }
const DoctorCounter = ({ children }) => {
      return JSON.parse(localStorage.getItem("decode")).role === 2? <Navigate to="/" replace /> : children  ;
      }
const PatientCounter = ({ children }) => {
  return JSON.parse(localStorage.getItem("decode")).role === 3? <Navigate to="/" replace /> : children  ;
  }

export {RequireAuth, AlreadyLogin, PatientCounter, AdminCounter, DoctorCounter}