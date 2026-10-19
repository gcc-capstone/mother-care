import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { loadEnv } from 'vite'
import { usabilityEnabled } from '../shared/usability/buildGate.ts'


// https://vite.dev/config/
export default defineConfig(({ command, mode }) => ({
  define: { __USABILITY_TESTING__: JSON.stringify(usabilityEnabled(command, mode, loadEnv(mode, process.cwd(), 'VITE_').VITE_ENABLE_USABILITY_TESTING)) },
  plugins: [react(), tailwindcss()],
  server: { port: 5174, strictPort: true },
  preview: { port: 4174, strictPort: true },
}))
