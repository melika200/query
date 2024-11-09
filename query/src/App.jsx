import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Products from "./Pages/Products/Products";
import Home from "./Pages/Home/Home";

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />
    },{
      path: '/product',
      element: <Products />
    },
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
