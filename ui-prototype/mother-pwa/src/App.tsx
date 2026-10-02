import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import { ActionLink, Page, ScrollToTop } from './components/Page'
import MotherStateProvider from './layouts/MotherStateProvider'
import Home from './screens/Home'
import Forms from './screens/Forms'
import FormDetails from './screens/FormDetails'
import Resources from './screens/Resources'
import ResourceDetails from './screens/ResourceDetails'
import Earn from './screens/Earn'
import OpportunityDetails from './screens/OpportunityDetails'
import Store from './screens/Store'
import Goals from './screens/Goals'
import Profile from './screens/Profile'
import Notifications from './screens/Notifications'

export default function App() {
  return <MotherStateProvider><BrowserRouter><ScrollToTop />
    <div className="mx-auto flex min-h-dvh max-w-[430px] flex-col bg-[var(--bg)]">
      <a href="#main-content" className="sr-only z-20 bg-white p-3 focus:not-sr-only">Skip to content</a>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/forms" element={<Forms />} />
        <Route path="/forms/:id" element={<FormDetails />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/resources/:id" element={<ResourceDetails />} />
        <Route path="/earn" element={<Earn />} />
        <Route path="/earn/:id" element={<OpportunityDetails />} />
        <Route path="/store" element={<Store />} />
        <Route path="/store/:id" element={<Store />} />
        <Route path="/goals" element={<Goals />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="*" element={<Page title="Page not found"><p>Choose a tab below or return home.</p><ActionLink to="/">Go home</ActionLink></Page>} />
      </Routes>
      <NavBar />
    </div>
  </BrowserRouter></MotherStateProvider>
}
