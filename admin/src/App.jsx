import { useState } from "react";
import { Routes, Route, Router } from "react-router-dom";
import "./App.css";

//pages
import ProtectedRoute from "./ProtectedRoute";
import Authenticate from "./pages/Authenticate";
import Home from "./pages/Home";

function App() {
    const isAuthenticated = false;
    return (
        <>
            <Routes>
                <Route path="/login" element={<Authenticate />} />
                <Route
                    element={
                        <ProtectedRoute isAuthenticated={isAuthenticated} />
                    }
                >
                    <Route path="/" element={<Home />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
