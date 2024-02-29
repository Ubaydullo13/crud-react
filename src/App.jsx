import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'

function ProtectedRoute({children, redirectTo = '/login', isAuthenticated}){
     const navigate = useNavigate();
       if (!isAuthenticated) {
         navigate(redirectTo);
       }
    
     return children;
     }

function App() {
  const [token, setToken] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token){
      setToken(token);
    }
  }, [])


  return (
    <>
    <Routes>
      <Route path='/' element={
        <ProtectedRoute isAuthenticated={token ? true : false}>
          <Home/>
        </ProtectedRoute>
      }/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      </Routes>
    </>
    
  )
}

export default App  