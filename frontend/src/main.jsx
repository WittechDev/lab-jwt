import { GoogleOAuthProvider } from "@react-oauth/google";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import MyRoutes from "./routes";

const GG_CLIENT_ID = import.meta.env.VITE_GG_CLINET_ID;

createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={GG_CLIENT_ID}>
    <StrictMode>
      <MyRoutes />
    </StrictMode>
  </GoogleOAuthProvider>
);
