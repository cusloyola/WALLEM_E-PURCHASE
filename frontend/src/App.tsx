// Pages 
import Login from './pages/Login.tsx'
import NotFound from './pages/NotFound.tsx'
import Dashboard from './pages/Dashboard.tsx'
import NewPR from './pages/NewPR.tsx'
import OutstandingPR from './pages/OutstandingPR.tsx'
import PendingPR from './pages/PendingPR.tsx'

// Admin Pages
import PendAppPO from './pages/PendAppPO.tsx'
import WithoutPO from './pages/WithoutPO.tsx'
import ManualPR from './pages/ManualPR.tsx'
import DisapprovedPR from './pages/DisapprovedPR.tsx'
import Configuration from './pages/Configuration.tsx'
import Reports from './pages/Reports.tsx'

import ViewPR from './pages/ViewPR.tsx'
import ViewPO from './pages/ViewPO.tsx'
import NewPO from './pages/NewPO.tsx'
import SupplierList from './pages/SupplierList.tsx'
import UserRights from './pages/UserRights.tsx'

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
        <Route path="/pending-approved-po" element={<ProtectedRoute><PendAppPO /></ProtectedRoute>} />
        <Route path="/without-po" element={<ProtectedRoute><WithoutPO /></ProtectedRoute>} />
        <Route path="/manual-pr-rfp" element={<ProtectedRoute><ManualPR /></ProtectedRoute>} />
        <Route path="/disapproved-pr" element={<ProtectedRoute><DisapprovedPR /></ProtectedRoute>} />
        <Route path="/configuration" element={<ProtectedRoute><Configuration /></ProtectedRoute>} />
        <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
        <Route path="/view-pr" element={<ProtectedRoute><ViewPR /></ProtectedRoute>} />
        <Route path="/view-po" element={<ProtectedRoute><ViewPO /></ProtectedRoute>} />
        <Route path="/new-po" element={<ProtectedRoute><NewPO /></ProtectedRoute>} />
        <Route path="/supplier-list" element={<ProtectedRoute><SupplierList /></ProtectedRoute>} />
        <Route path="/user-rights" element={<ProtectedRoute><UserRights /></ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer position="top-center" autoClose={1500} limit={1} theme="colored" />
    </>
  )
}

export default App
