import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useArticle } from "../utils/hooks/useArticle";
import ArticleList from "../components/Home/ArticleList";

const articles = [
  {
    id: 1,
    imgUrl:
      "https://photo-baomoi.bmcdn.me/w700_r16x9/2025_02_01_83_51371191/9c4dc9110a5ee300ba4f.jpg.webp",
    context:
      'Báo chí Thái Lan choáng váng về "núi tiền" thưởng Xuân Son nhận được sau AFF Cup Cup Cup Cup Cup',
  },
  {
    id: 2,
    imgUrl:
      "https://static-images.vnncdn.net/vps_images_publish/000001/000003/2025/3/2/atletico-khieu-chien-real-madrid-doi-chan-vang-julian-alvarez-42060.jpg?width=360&s=J5a9XWS1afKdZXMb4mAg0g",
    context: "Atletico thách thức Real Madrid: Đôi chân vàng Julian Alvarez",
  },
  {
    id: 3,
    imgUrl:
      "https://static-images.vnncdn.net/vps_images_publish/000001/000003/2025/3/1/tuyen-viet-nam-tuan-anh-hay-nhung-can-thuyet-phuc-hlv-kim-sang-sik-103411.jpg?width=500&s=LjVL71XT5RG4Mj6YF_rZFQ",
    context:
      "Tuyển Việt Nam: Tuấn Anh hay nhưng cần thuyết phục HLV Kim Sang Sik",
  },
];
const Home = () => {
  const [listNews, setListNews] = useState(null);
  const { getListArticle } = useArticle();
  useEffect(() => {
    const fetchListNews = async () => {
      try {
        const news = await getListArticle(12, 0);
        setListNews(news.articles);
      } catch (error) {
        console.log(error);
      }
    };
    fetchListNews();
  }, []);
  return (
    <>
      {listNews ? (
        <div className="container-sm" id="home">
          <div id="top-art-container">
            <div className="p-2 breadcrumb" id="breadcrumb-top">
              <h1>Tin mới nhất</h1>
            </div>
            <div className="row">
              <div className="col-xl-6 p-2 hoveractive" id="top-article">
                <Link
                  className="card p-2 link-underline link-underline-opacity-0"
                  to={`/article/${listNews[0].id}`}
                >
                  <img
                    src={
                      listNews[0].details.find(
                        (detail) => detail.type === "image"
                      )?.imgUrl
                    }
                    className="card-img-top"
                  ></img>
                  <div className="card-body p-2 overflow-hidden">
                    <h4 className="card-text">{listNews[0].title}</h4>
                  </div>
                </Link>
              </div>
              <div className="col-xl-6">
                {/* side-top-art , max chars = 102*/}
                <div className="d-flex flex-column">
                  {listNews.slice(1, 4).map((news) => (
                    <div className="p-2 hoveractive" key={news.id}>
                      <Link
                        className="card p-1 side-content d-flex flex-row link-offset-2 link-underline link-underline-opacity-0"
                        to={`/article/${news.id}`}
                      >
                        <div>
                          <img
                            className="card-img-top rounded"
                            src={
                              news.details.find(
                                (detail) => detail.type === "image"
                              )?.imgUrl
                            }
                          ></img>
                        </div>
                        <div className="card-body overflow-hidden">
                          <div className="card-text text-truncate-container">
                            {news.title}
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
                {/* side-top-art end*/}
              </div>
            </div>
            <div className="p-2 breadcrumb" id="breadcrumb-top">
              {/* <h3>Tin mới</h3> */}
              <hr className="border-1" />
            </div>
            <ArticleList listNews={listNews.slice(4)} />
          </div>
        </div>
      ) : (
        <p>loading...</p>
      )}
    </>
  );
};

export default Home;
