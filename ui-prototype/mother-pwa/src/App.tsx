import { lazy, Suspense } from 'react'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
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
import GoalDetails from './screens/GoalDetails'
import Profile from './screens/Profile'
import Notifications from './screens/Notifications'

// The dynamic import is removed entirely from production bundles.
const UsabilityTesting = __USABILITY_TESTING__ ? lazy(() => import('../../shared/usability/UsabilityTesting.tsx')) : null

function AppLayout() {
  return <MotherStateProvider>
    {UsabilityTesting && <Suspense fallback={null}><UsabilityTesting application="mother-pwa" /></Suspense>}
    <ScrollToTop />
    <div className="mx-auto flex min-h-dvh max-w-[430px] flex-col bg-[var(--bg)]">
      <a href="#main-content" className="sr-only z-20 bg-white p-3 focus:not-sr-only">Skip to content</a>
      <Outlet />
      <NavBar />
    </div>
  </MotherStateProvider>
}

const router = createBrowserRouter([{
  path: '/',
  element: <AppLayout />,
  children: [
    { index: true, element: <Home /> },
    { path: 'forms', element: <Forms /> },
    { path: 'forms/:id', element: <FormDetails /> },
    { path: 'resources', element: <Resources /> },
    { path: 'resources/:id', element: <ResourceDetails /> },
    { path: 'earn', element: <Earn /> },
    { path: 'earn/:id', element: <OpportunityDetails /> },
    { path: 'store', element: <Store /> },
    { path: 'store/:id', element: <Store /> },
    { path: 'goals', element: <Goals /> },
    { path: 'goals/:id', element: <GoalDetails /> },
    { path: 'profile', element: <Profile /> },
    { path: 'notifications', element: <Notifications /> },
    { path: '*', element: <Page title="Page not found"><p>Choose a tab below or return home.</p><ActionLink to="/">Go home</ActionLink></Page> },
  ],
}])

export default function App() {
  return <RouterProvider router={router} />
}
