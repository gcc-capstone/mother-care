import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { motherApiFetchV1 } from './api/authClient.ts'

(window as any).motherApiFetchV1 = motherApiFetchV1;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
