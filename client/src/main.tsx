import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom';
import { router } from '@/router';
import { SearchContextProvider, AppContextProvider, ThemeContextProvider } from '@/context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './styles/index.scss'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeContextProvider>
        <AppContextProvider>
          <SearchContextProvider>
            <RouterProvider router={router} />
          </SearchContextProvider>
        </AppContextProvider>
      </ThemeContextProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
