import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { App } from './App'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from './theme'

const rootElement = document.getElementById('app')
if (!rootElement) throw new Error('Failed to find the root element')

const root = ReactDOM.createRoot(rootElement as HTMLElement)

root.render(
    <BrowserRouter>
    <ThemeProvider theme={theme}>
        <App />
    </ThemeProvider>
    </BrowserRouter>
)