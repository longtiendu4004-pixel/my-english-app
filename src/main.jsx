import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { QAProvider } from './context/QAContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <QAProvider>
        <App />
      </QAProvider>
    </BrowserRouter>
  </React.StrictMode>,
)