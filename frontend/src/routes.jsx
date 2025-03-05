import { BrowserRouter, Route, Routes } from "react-router";

import App from "./pages/App";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Protected from "./pages/Protected";
import Register from "./pages/Register";

const MyRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/protected" element={<Protected />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default MyRoutes;
