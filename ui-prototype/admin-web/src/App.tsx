import { BrowserRouter, Navigate, Route, Routes, Link } from 'react-router-dom'
import {
  CareDashboard,
  Appointments,
  Forms,
  Meetings,
} from './screens/CareWorkflows'
import {
  AdminOnly,
  ResourceCatalog,
  FormBuilder,
  CareGroups,
  CounselorDirectory,
} from './screens/AdminTools'
import AdminGoals from './screens/AdminGoals'
import Performance from './screens/Performance'
import RecommendedResources from './screens/ReccomendResources'
import MotherSelection from './screens/MotherSelection'
import FollowUp from './screens/FollowUp'
import DemoProvider from './components/DemoProvider'
import AdminLayout from './layouts/AdminLayout'

export default function App() {
  return (
    <BrowserRouter>
      <DemoProvider>
        <Routes>
          <Route element={<AdminLayout />}>
            <Route
              path="/"
              element={<Navigate to="/admin/dashboard" replace />}
            />
            <Route
              path="/admin"
              element={<Navigate to="/admin/dashboard" replace />}
            />
            <Route path="/admin/admingoals" element={<AdminGoals />} />
            <Route
              path="/admin/counselors"
              element={
                <AdminOnly>
                  <CounselorDirectory />
                </AdminOnly>
              }
            />
            <Route path="/admin/dashboard" element={<CareDashboard />} />
            <Route path="/admin/appointments" element={<Appointments />} />
            <Route path="/admin/forms" element={<Forms />} />
            <Route path="/admin/meetings" element={<Meetings />} />
            <Route
              path="/admin/form-builder"
              element={
                <AdminOnly>
                  <FormBuilder />
                </AdminOnly>
              }
            />
            <Route
              path="/admin/resource-catalog"
              element={
                <AdminOnly>
                  <ResourceCatalog />
                </AdminOnly>
              }
            />
            <Route
              path="/admin/groups"
              element={
                <AdminOnly>
                  <CareGroups />
                </AdminOnly>
              }
            />
            <Route
              path="/admin/performance"
              element={
                <AdminOnly>
                  <Performance />
                </AdminOnly>
              }
            />
            <Route
              path="/admin/reccomendresources"
              element={<RecommendedResources />}
            />
            <Route
              path="/admin/motherselection"
              element={<MotherSelection />}
            />
            <Route
              path="/admin/mothers/:motherId"
              element={<MotherSelection />}
            />
            <Route path="/admin/followup" element={<FollowUp />} />
            <Route
              path="*"
              element={
                <div className="space-y-3 p-8">
                  <h1 className="text-2xl font-bold">Page not found</h1>
                  <Link className="text-accent underline" to="/admin/dashboard">
                    Return to dashboard
                  </Link>
                </div>
              }
            />
          </Route>
        </Routes>
      </DemoProvider>
    </BrowserRouter>
  )
}
