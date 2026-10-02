import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './screens/Home'
import Forms from './screens/Forms'
import Resources from './screens/Resources'
import Earn from './screens/Earn'
import Goals from './screens/Goals'
import AdminGoals from './screens/AdminGoals'
import Performance from './screens/Performance'
import PersistentNavigation from './screens/PersistantNavigation'
import ReccomendedResources from './screens/ReccomendResources'

function MobileLayout() {
  return (
    <div className="app mobile-app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/forms" element={<Forms />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/earn" element={<Earn />} />
        <Route path="/goals" element={<Goals />} />
      </Routes>

      <NavBar />
    </div>
  );
}

function AdminLayout() {
  return (
    <div className="admin-app flex min-h-screen items-stretch">
      <PersistentNavigation />
      <main className="flex-1">
      <Routes>
        <Route path="/admingoals" element={<AdminGoals />} />
        <Route path="/performance" element={<Performance />} />
        <Route path="/reccomendresources" element={<ReccomendedResources />} />
      </Routes>
      </main>
      </div>

  );
}

function App() {
  return (
    <BrowserRouter>
    
      <Routes>
        <Route path="/*" element={<MobileLayout />} />
        <Route path="/admin/*" element={<AdminLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
