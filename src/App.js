// import Contact from "./components/Contact/Contact";
import Nav from "./components/Nav";
import UserTable from "./components/Table";
import { useState } from "react";
import "./App.css";

function App() {
  const [filter, setFilter] = useState("income");
  return (
    <>
      <Nav setFilter={setFilter} filter={filter} />
      <UserTable filter={filter} />
    </>
  );
}

export default App;
