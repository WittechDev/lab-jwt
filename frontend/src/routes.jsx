import { BrowserRouter, Route, Routes } from "react-router";

import App from "./pages/App";
import Login from "./pages/Login";
import Register from "./pages/Register";

const MyRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  </BrowserRouter>
);

export default MyRoutes;
