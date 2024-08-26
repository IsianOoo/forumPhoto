import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import React from 'react'
import ReactDom from 'react-dom/client'

ReactDom.createRoot(document.getElementById('root')).render(
	<StrictMode>
		<Router>
			<App />
		</Router>
	</StrictMode>
)
