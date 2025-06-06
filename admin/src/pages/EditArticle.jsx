import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../store/reducers/userSlice";
import { useParams, useNavigate } from "react-router-dom";

import { useArticle } from "../utils/hook/useArticle";

import ArticleTextarea from "../components/editArticle/ArticleTextarea";
import ArticleImage from "../components/editArticle/ArticleImage";
import CategoryOption from "../components/editArticle/CategoryOption";

const EditArticle = () => {
    const { articleId } = useParams();
    const { getArticle } = useArticle();
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
    const { updateArticle, addRecord } = useArticle();

    const [news, setNews] = useState(null);
    const [items, setItems] = useState([]);
    const [nextId, setNextId] = useState(0);
    //load news
    useEffect(() => {
        const fetchNews = async (id) => {
            try {
                const response = await getArticle(id);
                setNews(response);
                console.log(response);
            } catch (error) {
                console.error("Error fetching article:", error);
            }
        };
        fetchNews(articleId);
    }, []);

    useEffect(() => {
        if (news) {
            let currentItems = [];
            try {
                news.details.map((detail, index) => {
                    if (detail.type == "text") {
                        let text = "";
                        detail.detail.map((subString) => {
                            text = text + subString + "\n";
                        });
                        currentItems = [
                            ...currentItems,
                            { id: index, content: "textarea", value: text },
                        ];
                    } else if (detail.type == "image") {
                        currentItems = [
                            ...currentItems,
                            {
                                id: index,
                                content: "picture",
                                value: {
                                    imgUrl: detail.imgUrl,
                                    imgTitle: detail.imgTitle,
                                },
                            },
                        ];
                    }
                });
                setItems(currentItems);
                setNextId(currentItems.length);
            } catch (error) {
                console.log(error);
            }
            console.log(news);
        }
    }, [news]);

    //Thên nội dung
    const handleAddItem = (itemType) => {
        const newItems = [
            ...items,
            { id: nextId, content: itemType, value: "" },
        ];
        setItems(newItems);
        setNextId(nextId + 1);
    };

    const onSubmit = async (data) => {
        console.log(data);
        //Kiểm tra nếu trường thể loại trống
        if (!data.categoryId) {
            // Thiết lập lỗi thủ công nếu không chọn category
            setError("categoryId", {
                type: "manual",
                message: "Vui lòng chọn 1 thể loại",
            });
            return;
        }
        //end Kiểm tra

        //Lọc và lấy dữ liệu
        const entries = Object.entries(data);
        const firstPartArticle = entries.slice(0, 3);
        const files = [];
        const detail = [];
        entries.slice(2).map((entry, index) => {
            const [key, value] = entry;
            if (key.includes("Description")) return null;
            else if (key.includes("picture")) {
                if (value.length == 0) {
                    setError("content", {
                        type: "manual",
                        message: "Các mục nội dung hình ảnh bị thiếu",
                    });
                    return;
                } else {
                    const imgDescription = entries[index + 3][1]; // index +3 vì slice bắt đầu từ index thứ 2, lấy index kế tiếp nên 2+1 = 3
                    files.push(value[0]);
                    detail.push({
                        imgTitle: imgDescription,
                        imgUrl: value[0].name,
                        type: "image",
                    });
                }
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
        const response = await updateArticle(formNewData, files, articleId);
        if (response.error) {
            setError("title", {
                type: "manual",
                message: response.error,
            });
        } else {
            alert("Bài báo được chỉnh sửa thành công");
            navigate(`/article/${response.Article.id}`);
        }
    };

    const handleAddRecord = async () => {
        setLoading(true);
        const response = await addRecord(articleId);
        if (response.message) {
            alert(response.message);
        } else {
            alert(response.error);
        }
        setLoading(false);
    };
    return (
        <>
            {news ? (
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
                                                value={news.title}
                                                {...register("title")}
                                            />
                                            {errors.title && (
                                                <div
                                                    className="error-message"
                                                    style={{ color: "red" }}
                                                >
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
                                                <div
                                                    className="error-message"
                                                    style={{ color: "red" }}
                                                >
                                                    {errors.categoryId.message}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div
                                        className="py-2"
                                        id="create-article-content"
                                    >
                                        <label htmlFor="">Nội dung:</label>
                                        <ul>
                                            {/* Load các nội dung */}
                                            {items.map((item) => (
                                                <li
                                                    className="d-flex flex-row py-2"
                                                    key={item.id}
                                                >
                                                    {item.content ==
                                                        "textarea" && (
                                                        <ArticleTextarea
                                                            {...register(
                                                                `${item.content}${item.id}`
                                                            )}
                                                            initValue={
                                                                item.value
                                                            }
                                                        />
                                                    )}
                                                    {item.content ==
                                                        "picture" && (
                                                        <div className="d-flex flex-column form-control">
                                                            <ArticleImage
                                                                {...register(
                                                                    `${item.content}${item.id}`
                                                                )}
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
                                                                setItems(
                                                                    (
                                                                        prevItems
                                                                    ) =>
                                                                        prevItems.filter(
                                                                            (
                                                                                i
                                                                            ) =>
                                                                                i.id !==
                                                                                item.id
                                                                        )
                                                                );
                                                                unregister(
                                                                    `${item.content}${item.id}`
                                                                );
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
                                            {/* <button
                                                type="button"
                                                className="btn btn-primary mx-2"
                                                onClick={() => {
                                                    handleAddRecord();
                                                }}
                                            >
                                                Tạo tự động đọc báo
                                            </button> */}
                                        </div>
                                        <div>
                                            <button
                                                type="submit"
                                                className="btn btn-primary"
                                            >
                                                gửi
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </>
    );
};

export default EditArticle;
