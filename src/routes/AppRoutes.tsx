import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
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
        <Route path="*" element={"Not Found"} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
