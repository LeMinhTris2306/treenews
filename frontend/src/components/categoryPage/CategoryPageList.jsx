import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useArticle } from "../../utils/hooks/useArticle";

const CategoryPageList = (props) => {
  const { categoryId } = props;
  const [index, setIndex] = useState(0);
  const [content, setContent] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const { getListArticle } = useArticle();

  useEffect(() => {
    const initialLoad = async () => {
      try {
        const initialNews = await fetchNews(5, 1, categoryId);

        if (initialNews) {
          setContent(loadArticles(initialNews));

          setIndex(1);
        }
      } catch (error) {
        console.log(error);
      }
    };

    initialLoad();
  }, [categoryId]);

  const fetchNews = async (n, skip, categoryId) => {
    try {
      const response = await getListArticle(n, skip, {
        categoryId: categoryId,
      });
      return response.articles;
    } catch (error) {
      console.error("Error fetching category:", error);
    }
  };
  const loadArticles = (listNews) => {
    return (
      <>
        {listNews.map((news) => (
          <div className="py-2" key={news.id}>
            <Link
              className="card d-flex flex-row link-underline link-underline-opacity-0"
              to={`/article/${news.id}`}
            >
              <img
                className="card-img-top img-fluid"
                src={
                  news.details.find((detail) => detail.type === "image")?.imgUrl
                }
              ></img>
              <div className="card-body overflow-hidden p-3 pt-4 me-2">
                <div className="card-text text-truncate-container me-5">
                  <h5>{news.title}</h5>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </>
    );
  };

  const handleAddContent = async () => {
    try {
      const listNews = await fetchNews(5, index * 5 + 1, categoryId);
      console.log(listNews);
      if (listNews && listNews.length > 0) {
        setContent(loadArticles(listNews));
      } else {
        setContent((prevContent) => {
          return [prevContent, <div>Nothing more</div>];
        });
        setHasMore(false);
      }
      setIndex(index + 1);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="d-flex flex-column" id="CPList">
        {content}
        {hasMore && (
          <div className="d-flex justify-content-center">
            <button
              type="button"
              className="btn btn-dark"
              onClick={() => {
                handleAddContent();
              }}
            >
              Xem thêm
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CategoryPageList;
