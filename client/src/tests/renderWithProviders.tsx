import {render} from '@testing-library/react'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import type { ReactNode } from 'react'

function createTestQueryClient(){
    return new QueryClient({
        defaultOptions: {
            queries:{
                retry: false,
                gcTime: 0
            }
        }
    })
}

export function renderWithProviders(ui:ReactNode){
    const queryClient = createTestQueryClient()
    return render (
       <QueryClientProvider client={queryClient}>
         {ui}
       </QueryClientProvider>
    )

}

export function wrapper({ children }: { children: ReactNode }) {
  const queryClient = createTestQueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}