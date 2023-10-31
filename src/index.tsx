import React from 'react'
import ReactDOM from 'react-dom/client'

import Screens from './screens'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <Screens />
  </React.StrictMode>,
)
