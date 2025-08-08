import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

// Single Page Apps for GitHub Pages
// https://github.com/rafgraph/spa-github-pages
// Check if we are being redirected from a 404.html file
if (window.location.search.includes('/?/')) {
  const url = window.location.search.split('/?/')[1]
  if (url) {
    window.history.replaceState(null, '', '/' + url.replace(/~/g, '&'))
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
