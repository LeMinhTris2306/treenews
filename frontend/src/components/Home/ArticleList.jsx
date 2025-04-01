import React from "react";
import { Link } from "react-router-dom";
const ArticleList = (props) => {
  const { listNews } = props;
  return (
    <div className="p-2" id="article-list">
      <div className="row">
        {listNews.slice(0, 4).map((news) => (
          <div className="col-sm-3" key={news.id}>
            <Link
              className="card d-flex flex-col border-0 link-underline link-underline-opacity-0 sub-article"
              to={`/article/${news.id}`}
            >
              <img
                className="card-img-top rounded img-fluid"
                src={
                  news.details.find((detail) => detail.type === "image")?.imgUrl
                }
              ></img>
              <div className="card-body overflow-hidden p-0 m-1">
                <div className="text-truncate-container">{news.title}</div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <hr />
      <div className="row">
        {listNews.slice(4).map((news) => (
          <div className="col-sm-3" key={news.id}>
            <Link
              className="card d-flex flex-col border-0 link-underline link-underline-opacity-0 sub-article"
              to={`/article/${news.id}`}
            >
              <img
                className="card-img-top rounded img-fluid"
                src={
                  news.details.find((detail) => detail.type === "image")?.imgUrl
                }
              ></img>
              <div className="card-body overflow-hidden p-0 m-1">
                <div className="text-truncate-container">{news.title}</div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticleList;
