import React, { useState, useEffect } from "react";
import { useArticle } from "../../utils/hooks/useArticle";
import { Link, useNavigate } from "react-router-dom";

const ListCreatedArticles = (props) => {
  const renderPagination = (noPage) => {
    const handlePageChange = (option) => {
      if (option === "next" && currentPage < noPage - 1)
        setCurrentPage(currentPage + 1);
      else if (option === "previous" && currentPage > 0)
        setCurrentPage(currentPage - 1);
    };
    const tmpArray = Array.from({ length: noPage }, (_, index) => index);
    return (
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <button
              className="page-link"
              aria-label="Previous"
              type="button"
              onClick={() => handlePageChange("previous")}
            >
              <span aria-hidden="true">&laquo;</span>
              <span className="sr-only">Previous</span>
            </button>
          </li>
          {tmpArray.map((key, index) => (
            <li className="page-item" key={key}>
              <button
                className="page-link"
                type="button"
                onClick={() => setCurrentPage(index)}
              >
                {index}
              </button>
            </li>
          ))}
          <li className="page-item">
            <button
              className="page-link"
              type="button"
              aria-label="Next"
              onClick={() => handlePageChange("next")}
            >
              <span aria-hidden="true">&raquo;</span>
              <span className="sr-only">Next</span>
            </button>
          </li>
        </ul>
      </nav>
    );
  };

  const { author } = props;
  const navigate = useNavigate();
  const { getListArticle, deleteArticle } = useArticle();
  const [loading, setLoading] = useState(true);
  const [listNews, setListNews] = useState(null);
  const [displayNews, setDisplayNews] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [noPage, setNoPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const fetchListNews = async () => {
    try {
      const news = await getListArticle(0, 0, {
        authorId: author,
      });
      setListNews(news.articles);
      setDisplayNews(news.articles);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchListNews();
  }, []);

  useEffect(() => {
    if (displayNews) setNoPage(Math.ceil(displayNews.length / 8));
  }, [displayNews]);

  const onSearch = () => {
    const result = listNews.filter((article) =>
      article.title.toLowerCase().includes(keyword.toLowerCase())
    );
    setDisplayNews(result);
  };

  const handleDelete = async (id) => {
    const result = confirm("Xác nhận xóa bài báo?");
    if (result) {
      try {
        await deleteArticle(id);
        alert("Bài báo được xóa thành công");
        fetchListNews();
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      <div className="py-2 row">
        {!loading ? (
          <>
            <div>
              <h2>Các bài báo đã viết</h2>
            </div>
            <nav className="navbar navbar-light bg-light px-2">
              <div className="form-inline d-flex flex-row">
                <input
                  className="form-control mr-sm-2"
                  type="search"
                  placeholder="Tìm tên bài báo"
                  aria-label="Search"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
                <button
                  className="btn btn-outline-success m-2 my-sm-0"
                  type="button"
                  onClick={() => onSearch()}
                >
                  Tìm
                </button>
              </div>
            </nav>

            {displayNews
              .slice(currentPage * 8, (currentPage + 1) * 8)
              .map((news) => (
                <div className="col-sm-3 my-3" key={news.id}>
                  <div className="card d-flex flex-col sub-article">
                    <Link
                      to={`/article/${news.id}`}
                      className="link-underline link-underline-opacity-0 "
                    >
                      <img
                        className="card-img-top rounded img-fluid"
                        src={
                          news.details.find((detail) => detail.type === "image")
                            ?.imgUrl
                        }
                      ></img>
                      <div className="card-body overflow-hidden p-0 m-1">
                        <div className="text-truncate-container m-2 card-text">
                          {news.title}
                        </div>
                      </div>
                    </Link>
                    <div className="card-footer">
                      <div className="d-flex flex-row justify-content-center">
                        <button
                          className="btn btn-outline-primary mx-1"
                          type="button"
                          onClick={() => navigate(`/edit/${news.id}`)}
                        >
                          Chỉnh sửa
                        </button>
                        <button
                          className="btn btn-outline-danger mx-1"
                          type="button"
                          onClick={() => {
                            handleDelete(news.id);
                          }}
                        >
                          xóa
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </>
        ) : null}
      </div>
      {renderPagination(noPage)}
    </>
  );
};

export default ListCreatedArticles;
