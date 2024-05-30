import {
  QueryClient,
  QueryClientProvider as QueryClientProviderComponent,
} from "@tanstack/react-query"

const queryClient = new QueryClient()

export default function QueryClientProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProviderComponent client={queryClient}>{children}</QueryClientProviderComponent>
  )
}
