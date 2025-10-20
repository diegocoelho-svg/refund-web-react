import { Routes, Route } from "react-router"

import { SignIn } from "../pages/Sign"

export function AuthRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
    </Routes>
  )
}