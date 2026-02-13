import { Route, Routes } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import Dashboard from "./pages/Dashboard"
import MembersPage from "./pages/MembersPage"

const App = () => {
  return (
    <>
      <h1>Gym Management System</h1>
      <Routes>
        <Route path="/" element={<LoginPage/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/members" element={<MembersPage/>}/>
      </Routes>
    </>
  )
}

export default App
