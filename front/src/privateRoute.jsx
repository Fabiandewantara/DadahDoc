import React from 'react'
import { Navigate } from 'react-router-dom'

export const RequireAuth = ({ children }) => {
  return localStorage.getItem("token")? children : <Navigate to="/login" replace />;
}
export const AlreadyLogin = ({ children }) => {

    return localStorage.getItem("token")? <Navigate to="/" replace /> : children;
  }