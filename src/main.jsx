import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ApiProvider } from './context/api.jsx'
import { FiltersProvider } from './context/filters.jsx'
import './index.css'
import App from './App.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
      <FiltersProvider>
        <App />
      </FiltersProvider>
  </StrictMode>,
)
