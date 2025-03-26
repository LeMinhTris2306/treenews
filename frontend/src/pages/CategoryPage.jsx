import React from "react";
import { useParams } from "react-router-dom";
import CategoryPageList from "../components/categoryPage/CategoryPageList";

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

const CategoryPage = () => {
  const { category } = useParams();
  return (
    <>
      <div className="container-sm" id="category-page">
        <div className="p-2 breadcrumb" id="breadcrumb-top">
          <h1>{category}</h1>
        </div>
        <hr />
        <div className="d-flex flex-column">
          <div className="card d-flex flex-column hero-card border-0">
            <img
              src="https://static-images.vnncdn.net/vps_images_publish/000001/000003/2025/3/2/atletico-khieu-chien-real-madrid-doi-chan-vang-julian-alvarez-42060.jpg?width=360&s=J5a9XWS1afKdZXMb4mAg0g"
              className="card-img-top img-fluid rounded"
            />
            <div className="card-body align-items-center justify-content-center">
              <div className="card-text text-truncate-container">
                <h3>context</h3>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <CategoryPageList />
      </div>
    </>
  );
};

export default CategoryPage;
