import { Route, Routes } from "react-router-dom"
import HomeDashboad from "../pages/dashboard/HomeDashboad"



const DashboardRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/dashboard" element={<HomeDashboad />} />
        <Route path="*" element={"Not Found"} />
      </Routes>
    </div>
  )
}

export default DashboardRoutes
