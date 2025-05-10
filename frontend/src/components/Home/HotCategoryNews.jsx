import React, { useState, useEffect } from "react";
import { useArticle } from "../../utils/hooks/useArticle";
import { Link, useNavigate } from "react-router-dom";
import { useVoiceCommands } from "../../utils/hooks/useVoiceCommand";
import { useSpeechExecutor } from "../../utils/hooks/useSpeechExecutor";

const HotCategoryNews = () => {
    const navigate = useNavigate();
    const [listCategoryNews, setListCategoryNews] = useState(null);
    const { getCategoryArticles } = useArticle();
    const [actions, setActions] = useState([]);
    useEffect(() => {
        const fetchListNews = async () => {
            try {
                const listCategoryNews = await getCategoryArticles(4);
                setListCategoryNews(listCategoryNews);
            } catch (error) {
                console.log(error);
            }
        };
        fetchListNews();
    }, []);

    useEffect(() => {
        if (listCategoryNews && listCategoryNews != []) {
            console.log(listCategoryNews);
            let listactions = [];
            listCategoryNews.map((categoryNews, index) => {
                const categoryName = categoryNews.category[0].categoryName;
                const tempListactions = categoryNews.articles.map(
                    (news, index) => [
                        `mở báo ${categoryName.toLowerCase()} số ${index + 1}`,
                        () => navigate(`/article/${news._id}`),
                    ]
                );
                listactions = [...listactions, ...tempListactions];
            });
            setActions(listactions);
        }
    }, [listCategoryNews]);
    useVoiceCommands({
        actions,
        componentName: "Danh mục",
    });
    useSpeechExecutor(actions, "Danh mục");
    return (
        <>
            {listCategoryNews && (
                <>
                    {listCategoryNews.map((categoryNews, index) => (
                        <div className="row" key={`${categoryNews.categoryId}`}>
                            <div className="d-flex">
                                <div
                                    className="breadcrumb p-2"
                                    id="breadcrumb-top"
                                >
                                    <h3>
                                        {categoryNews.category[0].categoryName}
                                    </h3>
                                </div>
                                <div className="ms-auto p-2  mt-2 ">
                                    <Link
                                        className="nav-link "
                                        to={`/category/${categoryNews.category[0].urlDisplay}`}
                                    >
                                        Xem thêm
                                    </Link>
                                </div>
                            </div>
                            {categoryNews.articles.map((news, index) => (
                                <div className="col-lg-3" key={index}>
                                    <Link
                                        className="card d-flex flex-col border-0 link-underline link-underline-opacity-0 sub-article"
                                        to={`/article/${news._id}`}
                                    >
                                        <img
                                            className="card-img-top rounded img-fluid"
                                            src={
                                                news.details.find(
                                                    (detail) =>
                                                        detail.type === "image"
                                                )?.imgUrl
                                            }
                                        ></img>
                                        <div className="card-body overflow-hidden p-0 m-1">
                                            <div className="text-truncate-container">
                                                <strong>
                                                    <u>{index + 1}</u>
                                                </strong>{" "}
                                                {news.title}
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                            <hr className="mt-2" />
                        </div>
                    ))}
                </>
            )}
        </>
    );
};

export default HotCategoryNews;
