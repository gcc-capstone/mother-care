import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './screens/Home'
import Forms from './screens/Forms'
import Resources from './screens/Resources'
import Earn from './screens/Earn'
import Goals from './screens/Goals'

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/forms" element={<Forms />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/earn" element={<Earn />} />
          <Route path="/goals" element={<Goals />} />
        </Routes>
        <NavBar />
      </div>
    </BrowserRouter>
  )
}

export default App
