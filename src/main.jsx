import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App.jsx'
import '@/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    if (import.meta.env.DEV) {
      // In dev, unregister any stale service workers and clear caches to prevent
      // cache-served stale Vite/React JS that breaks hooks ("Cannot read properties of null")
      navigator.serviceWorker.getRegistrations().then((regs) => {
        regs.forEach((r) => r.unregister().catch(() => {}))
      })
      if (window.caches) {
        caches.keys().then((keys) => keys.forEach((k) => caches.delete(k).catch(() => {})))
      }
    } else {
      navigator.serviceWorker.register('/sw.js').catch(() => {})
    }
  })
}