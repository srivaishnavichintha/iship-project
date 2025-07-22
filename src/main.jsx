import React from "react";
import ReactDOM from "react-dom/client";
import Login from "./Login"; // ✅ Correct import

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Login />
  </React.StrictMode>
);
