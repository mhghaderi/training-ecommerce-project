import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Providers from "./providers/Providers.jsx";


const root = createRoot(document.getElementById("root"));

root.render(
    <StrictMode>
        <Providers>
            <App />
        </Providers>
    </StrictMode>,
);
