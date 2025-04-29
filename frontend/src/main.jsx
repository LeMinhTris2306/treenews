import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import "./index.css";
import "./styles/main.scss";
import App from "./App.jsx";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./store/store.jsx";

import { UserProvider } from "./UserContext";

createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <StrictMode>
            <UserProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </UserProvider>
        </StrictMode>
    </Provider>
);
