import { AuthProvider } from "./contexts/AuthContext"

import { Routes } from "./routes/Index"

export function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  )
}