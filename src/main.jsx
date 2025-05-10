import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GlobalDataProvider } from "./components/global-data-context";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalDataProvider>
      <App />
    </GlobalDataProvider>
  </StrictMode>,
)
