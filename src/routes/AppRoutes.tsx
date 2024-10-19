import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import ProtectedRoute from "../ProtectRoute";
import DashboardRoutes from "./DashboardRoutes";
const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="">
              <Home />
            </div>
          }
        />
        <Route path="*" element={<ProtectedRoute element={
          <div className="App">
            <DashboardRoutes />
          </div>
        } />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
