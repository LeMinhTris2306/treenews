import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useArticle } from "../../utils/hooks/useArticle";

const ArticleDetail = () => {
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
  }, []);
  return (
    <>
      <div className="d-flex flex-column">
        {article ? (
          <div className="card pt-2">
            <div className="card-header">
              <h2>
                <strong>{article.title}</strong>
              </h2>
              <div className="d-flex flex-row pt-4" id="article-author">
                <p className="">{article.authorId}</p>
                <p className="mx-2 ">{article.uploadDay}</p>
              </div>
            </div>
            <div className="card-body">
              {article.details.map((detail) => (
                <div key={Math.random() * (100 - 1)}>
                  {/* {may be add h1 tag here} */}
                  {console.log(detail)}
                  {detail.type === "text" &&
                    detail.detail.map((text) => (
                      <p key={detail.text}>{text}</p>
                    ))}
                  {detail.type === "image" && (
                    <>
                      <div className="image-detail">
                        <img
                          className="card-img-top img-fluid rounded"
                          src={detail.imgUrl}
                        ></img>
                        <p className="mt-1">
                          <em>{detail.imgTitle}</em>
                        </p>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
};

export default ArticleDetail;
