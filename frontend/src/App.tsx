import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login.tsx'
import NotFound from './pages/NotFound.tsx'
import Dashboard from './pages/Dashboard.tsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ProtectedRoute from './components/ProtectedRoute.tsx'


function App() {
  return (
    <>
      <Routes>
        {/* Example starter routes */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer position="top-center" autoClose={1500} limit={1} theme="colored" />
    </>
  )
}

export default App
