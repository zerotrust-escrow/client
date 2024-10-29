import { Route, Routes } from "react-router-dom"
import HomeDashboad from "../pages/dashboard/HomeDashboad"
import CreateTransaction from "../pages/dashboard/CreateTransaction"
import TransactionCreated from "../pages/dashboard/TransactionCreated"
import SingleTransaction from "../pages/dashboard/SingleTransaction"



const DashboardRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/dashboard" element={<HomeDashboad />} />
        <Route path="/create-transaction" element={<CreateTransaction />} />
        <Route path="/created" element={<TransactionCreated />} />
        <Route path="/single-transaction" element={<SingleTransaction />} />

        <Route path="*" element={"Not Found"} />
      </Routes>
    </div>
  )
}

export default DashboardRoutes
