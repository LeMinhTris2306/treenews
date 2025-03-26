import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { selectCurrentUser } from "../store/reducers/userSlice";
import { useSelector } from "react-redux";
import { useArticle } from "../utils/hooks/useArticle";
import { useNavigate } from "react-router-dom";

import ArticleTextarea from "../components/createArticle/ArticleTextarea";
import ArticleImage from "../components/createArticle/ArticleImage";
import CategoryOption from "../components/createArticle/categoryOption";

const CreateArticle = () => {
  const navigate = useNavigate();
  const {
    register,
    unregister,
    handleSubmit,
    formState: { errors },
    control,
    setError,
  } = useForm();
  const currentUser = useSelector(selectCurrentUser);
  const { createArticle } = useArticle();

  const onSubmit = async (data) => {
    if (!data.categoryId) {
      // Thiết lập lỗi thủ công nếu không chọn category
      setError("categoryId", {
        type: "manual",
        message: "Vui lòng chọn 1 thể loại",
      });
      return;
    }
    const entries = Object.entries(data);
    const firstPartArticle = entries.slice(0, 3);
    const files = [];
    const detail = [];
    entries.slice(3).map((entry, index) => {
      const [key, value] = entry;
      if (key.includes("Description")) return null;
      else if (key.includes("picture")) {
        const imgDescription = entries[index + 4][1]; // index +4 vì slice bắt đầu từ index thứ 3, lấy index kế tiếp nên 3+1 = 4
        files.push(value[0]);
        detail.push({
          imgTitle: imgDescription,
          imgUrl: value[0].name,
          type: "image",
        });
      } else {
        detail.push({ detail: value.split("\n"), type: "text" });
      }
    });

    const today = new Date();
    const formattedDate = `${today.toLocaleDateString(
      "vi-VN"
    )} ${today.toLocaleTimeString("vi-VN")}`;
    const newdata = [
      ...firstPartArticle,
      ["details", detail],
      ["authorId", currentUser.id],
      ["displayName", "will be deleted"],
      ["uploadDay", formattedDate],
    ];
    const formNewData = Object.fromEntries(newdata);
    const response = await createArticle(formNewData, files);
    if (response.error) {
      setError("title", {
        type: "manual",
        message: response.error,
      });
    } else {
      alert("Bài báo được đăng thành công");
      navigate(`/article/${response.Article.id}`);
    }
  };

  const [items, setItems] = useState([]);
  const [nextId, setNextId] = useState(0);
  const handleAddItem = (itemType) => {
    // console.log(nextId);
    const newItems = [...items, { id: nextId, content: itemType }];
    setItems(newItems);
    setNextId(nextId + 1);
  };
  return (
    <>
      <div className="container" id="create-article">
        <div className="d-flex flex-column">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="d-flex flex-column">
                  {/* <== Tiêu đề báo =>> */}
                  <div className="my-2">
                    <p className="mb-2">Tiêu đề</p>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Tiêu đề bài báo"
                      {...register("title")}
                    />
                    {errors.title && (
                      <div className="error-message" style={{ color: "red" }}>
                        {errors.title.message}
                      </div>
                    )}
                  </div>
                  {/* <== End Tiêu đề báo =>> */}

                  <div className="my-2">
                    <p className="mb-2">Thể loại</p>
                    <Controller
                      name="categoryId"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <CategoryOption
                          {...field}
                          className="form-select"
                          aria-label="Default select example"
                        />
                      )}
                    />
                    {errors.categoryId && (
                      <div className="error-message" style={{ color: "red" }}>
                        {errors.categoryId.message}
                      </div>
                    )}
                  </div>
                  <div className="my-2">
                    <p className="mb-2">Mô tả</p>
                    <ArticleTextarea {...register("description")} />
                  </div>
                </div>
                <div className="py-2" id="create-article-content">
                  <label htmlFor="">Nội dung:</label>
                  <ul>
                    {items.map((item) => (
                      <li className="d-flex flex-row py-2" key={item.id}>
                        {item.content == "textarea" && (
                          <ArticleTextarea
                            {...register(`${item.content}${item.id}`)}
                          />
                        )}
                        {item.content == "picture" && (
                          <div className="d-flex flex-column form-control">
                            <ArticleImage
                              {...register(`${item.content}${item.id}`)}
                            />
                            <input
                              type="text"
                              name={`${item.content}Description${item.id}`}
                              className="form-control mt-2"
                              placeholder="nội dung hình ảnh"
                              {...register(
                                `${item.content}Description${item.id}`
                              )}
                            />
                          </div>
                        )}
                        <div className="option">
                          <button
                            type="button"
                            className="btn ms-2"
                            onClick={() => {
                              setItems((prevItems) =>
                                prevItems.filter((i) => i.id !== item.id)
                              );
                              unregister(`${item.content}${item.id}`);
                              unregister(
                                `${item.content}Description${item.id}`
                              );
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="22px"
                              viewBox="0 -960 960 960"
                              width="14px"
                              fill="#1f1f1f"
                            >
                              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                            </svg>
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="button-group d-flex flex-column">
                  <div className="py-2 d-flex flex-row">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => {
                        handleAddItem("textarea");
                      }}
                    >
                      Thêm nội dung
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary mx-2"
                      onClick={() => {
                        handleAddItem("picture");
                      }}
                    >
                      Thêm ảnh
                    </button>
                  </div>
                  <div>
                    <button type="submit" className="btn btn-primary">
                      gửi
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateArticle;
