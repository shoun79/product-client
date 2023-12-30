import {
    createBrowserRouter,
} from "react-router-dom";
import Home from "../components/Home";
import Dashboard from "../components/Dashboard";
import Products from "../components/Products";
import Main from "../layout/Main";
import DashboardLayout from "../layout/DashboardLayout";
import AddProduct from "../components/AddProduct";
import EditProduct from "../components/EditProduct";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: "/",
                element: <Home></Home>,
            }
        ]

    },
    {
        path: '/dashboard',
        element: <DashboardLayout></DashboardLayout>,
        children: [
            {
                path: '/dashboard',
                element: <Dashboard></Dashboard>
            },
            {
                path: '/dashboard/products',
                element: <Products></Products>
            },
            {
                path: '/dashboard/add-products',
                element: <AddProduct></AddProduct>
            },
            {
                path: '/dashboard/product/edit/:id',
                element: <EditProduct></EditProduct>
            }

        ]
    }
]);

export default router;