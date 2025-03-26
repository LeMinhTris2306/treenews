import React, { useState } from "react";

const articles = [
  {
    id: 1,
    url: "https://photo-baomoi.bmcdn.me/w250_r3x2/2025_02_17_119_51498856/10a1b03e9d70742e2d61.jpg.webp",
    context:
      'Báo chí Thái Lan choáng váng về "núi tiền" thưởng Xu ân Son nhận được sau AFF Cup',
  },
  {
    id: 2,
    url: "https://cdn-img.thethao247.vn/storage/files/nghuyen/2025/03/02/tien-linh-chuc-mung-nam-moi-doc-gia-the-thao-247-107464-1708401110-110020-1-1724919035-151910-673457a9a28d2-67c3f91e292fc.jpg",
    context: "Tiến Linh chấn thương sát ngày ĐT Việt Nam tập trung",
  },
  {
    id: 3,
    url: "https://cdn-img.thethao247.vn/resize_496x356/storage/files/haibui/2025/02/18/chrome_rbbcgcab6u-1-67b403af788bd.png",
    context: "Lịch thi đấu VALORANT Masters Bangkok 2025",
  },
  {
    id: 4,
    url: "https://static-images.vnncdn.net/vps_images_publish/000001/000003/2025/3/1/tien-linh-rua-bong-vang-binh-duong-ha-quy-nhon-binh-dinh-92942.jpg?width=360&s=2p5GawjOzj2xJiIanPyR0g",
    context: 'Tiến Linh "rửa" bóng vàng, Bình Dương hạ Quy Nhơn Bình Định',
  },
  {
    id: 5,
    url: "https://static-images.vnncdn.net/vps_images_publish/000001/000003/2025/3/1/tien-linh-rua-bong-vang-binh-duong-ha-quy-nhon-binh-dinh-92942.jpg?width=360&s=2p5GawjOzj2xJiIanPyR0g",
    context: 'Tiến Linh "rửa" bóng vàng, Bình Dương hạ Quy Nhơn Bình Định',
  },
];

const CategoryPageList = () => {
  const loadArticles = () => {
    return (
      <>
        {articles.map((article) => (
          <div className="py-2" key={article.id}>
            <div className="card d-flex flex-row">
              <img className="card-img-top img-fluid" src={article.url}></img>
              <div className="card-body overflow-hidden p-3 pt-4 me-2">
                <div className="card-text text-truncate-container me-5">
                  <h5>{article.context}</h5>
                </div>
              </div>
            </div>
          </div>
        ))}
      </>
    );
  };

  const [content, setContent] = useState([]);
  const handleAddContent = () => {
    setContent((prevContent) => [...prevContent, loadArticles()]);
  };
  return (
    <>
      <div className="d-flex flex-column" id="CPList">
        {loadArticles()}
        {content}
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
      </div>
    </>
  );
};

export default CategoryPageList;
