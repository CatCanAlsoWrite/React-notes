import React from 'react'
import ReactDOMClient from 'react-dom/client'
import './index.css'
import App from './App'

const r = ReactDOMClient.createRoot(document.getElementById('root'))
r.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

/*before react version18 
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
*/
