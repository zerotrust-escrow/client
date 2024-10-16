import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="px-10">
              <h3>Home</h3>
            </div>
          }
        />
        <Route path="*" element={"Not Found"} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
