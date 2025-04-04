import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useArticle } from "../../utils/hooks/useArticle";

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

const RecommendArticle = (props) => {
  const { categoryId, title } = props;
  const [listNews, setListNews] = useState([]);
  const { getListArticle } = useArticle();
  useEffect(() => {
    const fetchNews = async (n, skip, categoryId) => {
      try {
        const response = await getListArticle(n, skip, {
          categoryId: categoryId,
          title: { $ne: title },
        });
        if (response && response.articles.length > 0) {
          setListNews(response.articles);
        } else {
          setListNews([]);
        }
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    };

    fetchNews(5, 0, categoryId);
  }, [title]);

  return (
    <>
      <div className="d-flex flex-column" id="recommend">
        {listNews && listNews.map((news) => console.log(Object.entries(news)))}
        {listNews.map((news) => (
          <Link
            className="py-2 link-underline link-underline-opacity-0"
            key={news.id}
            to={`/article/${news.id}`}
          >
            <div className="card d-flex flex-row">
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
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default RecommendArticle;
