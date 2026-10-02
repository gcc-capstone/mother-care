import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AdminGoals from './screens/AdminGoals'
import Performance from './screens/Performance'
import PersistentNavigation from './screens/PersistantNavigation'
import RecommendedResources from './screens/ReccomendResources'
import MotherSelection from './screens/MotherSelection'
import FollowUp from './screens/FollowUp'

export default function App() {
  return (
    <BrowserRouter>
      <div className="admin-app flex min-h-screen items-stretch">
        <PersistentNavigation />
        <main className="min-w-0 flex-1">
          <Routes>
            <Route path="/" element={<Navigate to="/admin/performance" replace />} />
            <Route path="/admin" element={<Navigate to="/admin/performance" replace />} />
            <Route path="/admin/admingoals" element={<AdminGoals />} />
            <Route path="/admin/performance" element={<Performance />} />
            <Route path="/admin/reccomendresources" element={<RecommendedResources />} />
            <Route path="/admin/motherselection" element={<MotherSelection />} />
            <Route path="/admin/followup" element={<FollowUp />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
