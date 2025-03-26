import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  return (
    <>
      <div className="container-sm" id="home">
        <div id="top-art-container">
          <div className="p-2 breadcrumb" id="breadcrumb-top">
            <h1>Thể thao</h1>
          </div>
          <div className="row">
            <div className="col-xl-6 p-2 hoveractive" id="top-article">
              <a
                className="card p-2 link-underline link-underline-opacity-0"
                href=""
                onClick={() => {
                  navigate("/article/67e17b297610feb657fd009c");
                }}
              >
                <img
                  src="https://photo-baomoi.bmcdn.me/w700_r16x9/2025_02_01_83_51371191/9c4dc9110a5ee300ba4f.jpg.webp"
                  className="card-img-top"
                ></img>{" "}
                <div className="card-body p-2 overflow-hidden">
                  <h4 className="card-text">
                    Báo chí Thái Lan choáng váng về "núi tiền" thưởng Xuân Son
                    nhận được sau AFF Cup Cup Cup Cup Cup
                  </h4>
                </div>
              </a>
            </div>
            <div className="col-xl-6">
              {/* side-top-art , max chars = 102*/}
              <div className="d-flex flex-column">
                {articles.map((article) => (
                  <div className="p-2 hoveractive" key={article.id}>
                    <a
                      className="card p-1 side-content d-flex flex-row link-offset-2 link-underline link-underline-opacity-0"
                      href=""
                      onClick={() => {
                        navigate("/article/67e17b297610feb657fd009c");
                      }}
                    >
                      <img className="card-img-top" src={article.imgUrl}></img>
                      <div className="card-body overflow-hidden">
                        <div className="card-text text-truncate-container">
                          {article.context}
                        </div>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
              {/* side-top-art end*/}
            </div>
          </div>
          <div className="p-2 breadcrumb" id="breadcrumb-top">
            <h3>Tin mới</h3>
          </div>
          <ArticleList />
        </div>
      </div>
    </>
  );
};

export default Home;
