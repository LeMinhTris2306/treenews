import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import CategoryPageList from "../components/categoryPage/CategoryPageList";
import { useCategory } from "../utils/hooks/useCategory";
import { useArticle } from "../utils/hooks/useArticle";

const CategoryPage = () => {
  const { categoryUrl } = useParams();
  const [category, setCategory] = useState(null);
  const [listNews, setListNews] = useState(null);
  const { getCategory } = useCategory();
  const { getListArticle } = useArticle();

  const fetchNews = async (n, skip, categoryId) => {
    try {
      const response = await getListArticle(n, skip, categoryId);
      if (response && response.articles.length > 0) {
        setListNews(response.articles);
      } else {
        setListNews([]);
      }
    } catch (error) {
      console.error("Error fetching category:", error);
    }
  };
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await getCategory(categoryUrl);
        setCategory(response);
        if (response) {
          await fetchNews(1, 0, response.id);
        }
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    };

    fetchCategory();
  }, [categoryUrl]);
  if (listNews) console.log(listNews);
  return (
    <>
      {listNews ? (
        <>
          {listNews.length > 0 ? (
            <div className="container-sm" id="category-page">
              <div className="p-2 breadcrumb" id="breadcrumb-top">
                <h1>{category.categoryName}</h1>
              </div>
              <hr />
              <div className="d-flex flex-column">
                <Link
                  className="card d-flex flex-column hero-card border-0 link-underline link-underline-opacity-0"
                  to={`/article/${listNews[0].id}`}
                >
                  <img
                    src={
                      listNews[0].details.find(
                        (detail) => detail.type === "image"
                      )?.imgUrl
                    }
                    className="card-img-top img-fluid rounded"
                  />
                  <div className="card-body align-items-center justify-content-center">
                    <div className="card-text text-truncate-container">
                      <h3>{listNews[0].title}</h3>
                    </div>
                  </div>
                </Link>
              </div>
              <hr />
              <CategoryPageList categoryId={category.id} />
            </div>
          ) : (
            <p className="container-sm" id="category-page">
              Hiện chưa có bài báo nào, bạn vui lòng quay lại sau
            </p>
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default CategoryPage;
