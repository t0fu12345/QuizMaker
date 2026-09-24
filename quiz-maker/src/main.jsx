import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { LazyMotion, domAnimation } from 'motion/react'
import './index.css'

if (!localStorage.getItem('userId')) {
  const newId = 'guest_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
  localStorage.setItem('userId', newId);
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LazyMotion features={domAnimation}>
      <App />
    </LazyMotion>
  </React.StrictMode>,
)
