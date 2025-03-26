import React from "react";
import { Link } from "react-router-dom";
const ArticleList = (props) => {
  const { listNews } = props;
  return (
    <div className="p-2" id="article-list">
      <div className="row">
        {listNews.slice(0, 4).map((news) => (
          <div className="col-3" key={news.id}>
            <div className="card d-flex flex-col border-0">
              <img
                className="card-img-top rounded img-fluid"
                src={
                  news.details.find((detail) => detail.type === "image")?.imgUrl
                }
              ></img>
              <div className="card-body overflow-hidden p-0 m-1">
                <div className="text-truncate-container">{news.context}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <hr />
      <div className="row">
        {listNews.slice(4).map((article) => (
          <div className="col-3" key={article.id}>
            <div className="card d-flex flex-col border-0">
              <img
                className="card-img-top rounded img-fluid"
                src={article.url}
              ></img>
              <div className="card-body overflow-hidden p-0 m-1">
                <div className="text-truncate-container">{article.context}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticleList;
