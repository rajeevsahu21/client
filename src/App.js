import Contact from "./components/Contact/Contact";
import Nav from "./components/Nav";
import UserTable from "./components/Table";
import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

function App() {
  const [filter, setFilter] = useState("income");

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Nav setFilter={setFilter} filter={filter} />
          <UserTable filter={filter} />
        </>
      ),
    },
    {
      path: "/contact",
      element: <Contact />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
