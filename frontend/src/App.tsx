// Pages 
import Login from './pages/Login.tsx'
import NotFound from './pages/NotFound.tsx'
import Dashboard from './pages/Dashboard.tsx'
import NewPR from './pages/NewPR.tsx'
import OutstandingPR from './pages/OutstandingPR.tsx'
import PendingPR from './pages/PendingPR.tsx'
import EditProfile from './pages/EditProfile.tsx'

// Components
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ProtectedRoute from './components/ProtectedRoute.tsx'
import { Routes, Route, Navigate } from 'react-router-dom'



function App() {
  return (
    <>
      <Routes>
        {/* Example starter routes */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/new-pr" element={<ProtectedRoute><NewPR /></ProtectedRoute>} />
        <Route path="/outstanding-pr" element={<ProtectedRoute><OutstandingPR /></ProtectedRoute>} />
        <Route path="/pending-pr" element={<ProtectedRoute><PendingPR /></ProtectedRoute>} />
        <Route path="/edit-profile" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer position="top-center" autoClose={1500} limit={1} theme="colored" />
    </>
  )
}

export default App
