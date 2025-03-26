import React from "react";

import ArticleDetail from "../components/article/ArticleDetail";
import RecommendArticle from "../components/article/RecommendArticle";
const Article = () => {
  return (
    <>
      <div className="container" id="article-main">
        <ArticleDetail />
        <div className="my-4">
          <h3>Các bài báo liên quan</h3>
        </div>
        <RecommendArticle />
      </div>
    </>
  );
};

export default Article;
