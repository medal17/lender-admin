import { useState, useLayoutEffect } from 'react'

import './App.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/routes'
import { ToastContainer } from 'react-toastify'
// import 'bootstrap/dist/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css';
import { ClientJS } from 'clientjs'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import ErrorBoundary from './routes/ErrorBoundary'

const queryClient = new QueryClient()

export function App() {

  const client = new ClientJS()

  useLayoutEffect(() => {
    if (localStorage.getItem('clientId') === null) {
      const clientId = client.getFingerprint().toString();
      localStorage.setItem('clientId', clientId)
      window.location.reload()
    }
  }, [])
  
  return (
    <div className='overflow-x-hidden'>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary>
          <RouterProvider router={router} />
          <ToastContainer theme="light" className={''} />
        </ErrorBoundary>
      </QueryClientProvider>
    </div>
  )
}


