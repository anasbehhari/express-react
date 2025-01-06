import { useRoutes } from "react-router-dom";
import DashboardPage from "../pages/Dashboard.page";
import { Login } from "../pages/Login.page";


function AppRoutes() {
  return useRoutes([
    {
      element: <Login />,
      path: "/login",
    },
    {
      element: <DashboardPage />,
      path: "/",
    },
  
  ]);
}

export default AppRoutes;