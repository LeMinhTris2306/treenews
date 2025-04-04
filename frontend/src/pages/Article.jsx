import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useArticle } from "../utils/hooks/useArticle";

import ArticleDetail from "../components/article/ArticleDetail";
import RecommendArticle from "../components/article/RecommendArticle";
const Article = () => {
  const { articleid } = useParams();

  const { getArticle } = useArticle();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const articleData = await getArticle(articleid);
        setArticle(articleData);
      } catch (error) {
        console.error("Error fetching article:", error);
      }
    };
    fetchArticle();
    window.scrollTo(0, 0);
  }, [articleid]);

  console.log(article ? article : null);
  return (
    <>
      <div className="container" id="article-main">
        {article ? (
          <>
            <ArticleDetail article={article} />
            <div className="my-4">
              <h3>Các bài báo liên quan</h3>
            </div>
            <RecommendArticle
              categoryId={article.categoryId}
              title={article.title}
            />
          </>
        ) : (
          <p>loading...</p>
        )}
      </div>
    </>
  );
};

export default Article;
