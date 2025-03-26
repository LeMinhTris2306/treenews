import { useContext } from "react";
// import "./App.css";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Account from "./pages/Account";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import CategoryPage from "./pages/CategoryPage";
import Article from "./pages/Article";
import CreateArticle from "./pages/CreateArticle";

import ProtectedRoute from "./protectedRoute";
import { UserContext } from "./UserContext";

function App() {
  const { isAuthenticated } = useContext(UserContext);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/account" element={<Account />} />
          <Route path="/createarticle" element={<CreateArticle />} />
        </Route>
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/article/:articleid" element={<Article />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
