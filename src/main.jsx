import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import DeviceFrame from './components/DeviceFrame.jsx'
import './index.css'

// Im iframe (?embedded) rendern wir die reine App, sonst den iPhone-12-Rahmen.
const isEmbedded = new URLSearchParams(window.location.search).has('embedded')

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {isEmbedded ? <App /> : <DeviceFrame />}
  </React.StrictMode>,
)
