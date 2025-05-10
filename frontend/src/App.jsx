import { useContext } from "react";
// import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";

import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Account from "./pages/Account";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import CategoryPage from "./pages/CategoryPage";
import Article from "./pages/Article";
import CreateArticle from "./pages/CreateArticle";
import EditArticle from "./pages/EditArticle";
import VoiceUI from "./components/voice/VoiceUI";
import Alert from "./components/alert/Alert";

import ProtectedRoute from "./ProtectedRoute";
import { UserContext } from "./UserContext";
import Dictaphone from "./voice/useSpeechRecognition";

function App() {
    const location = useLocation();
    const { isAuthenticated } = useContext(UserContext);

    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<Dictaphone />} />
                <Route
                    element={
                        <ProtectedRoute isAuthenticated={isAuthenticated} />
                    }
                >
                    <Route path="/account" element={<Account />} />
                    <Route path="/createarticle" element={<CreateArticle />} />
                    <Route path="/edit/:articleId" element={<EditArticle />} />
                </Route>
                <Route
                    path="/category/:categoryUrl"
                    element={<CategoryPage />}
                />
                <Route path="/article/:articleid" element={<Article />} />
            </Routes>
            <Footer />
            <Alert />
            {location.pathname != "/login" &&
                location.pathname != "/register" && <VoiceUI />}
        </>
    );
}

export default App;
