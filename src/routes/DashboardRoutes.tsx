import { Route, Routes } from "react-router-dom"
import HomeDashboad from "../pages/dashboard/HomeDashboad"
import CreateTransaction from "../pages/dashboard/CreateTransaction"



const DashboardRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/dashboard" element={<HomeDashboad />} />
        <Route path="/create-transaction" element={<CreateTransaction />} />

        <Route path="*" element={"Not Found"} />
      </Routes>
    </div>
  )
}

export default DashboardRoutes
