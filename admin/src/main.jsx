import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./styles/main.scss";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App.jsx";
import store from "./store/store.jsx";

createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <StrictMode>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </StrictMode>
    </Provider>
);
