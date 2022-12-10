import Dashboard from "@features/Dashboard";
import Home from "@features/Home";
import { createBrowserRouter } from "react-router-dom";

const Router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/dashboard",
        element: <Dashboard />,
    }
]);

export default Router;
