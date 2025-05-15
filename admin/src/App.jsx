import { useState, useEffect } from "react";
import { Routes, Route, Router } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./App.css";

import { useUser } from "./utils/hook/useUser";

//pages
import ProtectedRoute from "./ProtectedRoute";
import Authenticate from "./pages/Authenticate";
import Home from "./pages/Home";
import UserPage from "./pages/UserPage";
import UserDetail from "./pages/UserDetail";
import AdminDetail from "./pages/AdminDetail";
import ArticlesPage from "./pages/ArticlesPage";
import ArticleInfo from "./pages/ArticleInfo";
import EditArticle from "./pages/EditArticle";
import CreateArticle from "./pages/CreateArticles";
import CategoryPage from "./pages/CategoryPage";
import Header from "./components/layout/Header";
import Alert from "./components/alert/Alert";

function App() {
    const { loadUser } = useUser();
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    useEffect(() => {
        const initialLoad = async () => {
            await loadUser();
            setLoading(true);
        };

        const timer = setTimeout(() => {
            initialLoad();
        }, 1000);
        return () => {
            clearTimeout(timer);
        };
    }, []);

    useEffect(() => {
        console.log(`loading: ${loading}`);
    }, [loading]);

    if (!loading) {
        return (
            <>
                <div>loading</div>
            </>
        );
    }

    return (
        <>
            {location.pathname != "/login" && <Header />}
            <Routes>
                <Route path="/login" element={<Authenticate />} />
                <Route element={<ProtectedRoute />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/users" element={<UserPage />} />
                    <Route path="/articles" element={<ArticlesPage />} />
                    <Route path="/categories" element={<CategoryPage />} />
                    <Route path="/admin" element={<AdminDetail />} />
                    <Route path="/user/:userid" element={<UserDetail />} />
                    <Route
                        path="/article/:articleid"
                        element={<ArticleInfo />}
                    />
                    <Route path="/edit/:articleId" element={<EditArticle />} />
                    <Route path="/createarticle" element={<CreateArticle />} />
                </Route>
            </Routes>
            <Alert />
        </>
    );
}

export default App;
