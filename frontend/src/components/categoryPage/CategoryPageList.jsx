import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useArticle } from "../../utils/hooks/useArticle";
import { useNavigate } from "react-router-dom";
import { useVoiceCommands } from "../../utils/hooks/useVoiceCommand";
import { useSpeechExecutor } from "../../utils/hooks/useSpeechExecutor";

const CategoryPageList = (props) => {
    const { categoryId } = props;
    const [index, setIndex] = useState(0);
    const [listNews, setListNews] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [actions, setActions] = useState([]);
    const { getListArticle } = useArticle();
    const navigate = useNavigate();

    useEffect(() => {
        const initialLoad = async () => {
            setActions([]);
            setHasMore(true);
            try {
                const initialNews = await fetchNews(6, 0, categoryId);
                if (initialNews) {
                    setListNews(initialNews);
                    setIndex(1);
                }
            } catch (error) {
                console.log(error);
            }
        };

        initialLoad();
    }, [categoryId]);

    const fetchNews = async (n, skip, categoryId) => {
        try {
            const response = await getListArticle(n, skip, {
                categoryId: categoryId,
            });
            return response.articles;
        } catch (error) {
            console.error("Error fetching category:", error);
        }
    };

    const handleLoadMoreNews = async (categoryId) => {
        try {
            const listNews = await fetchNews(6, index * 6, categoryId);
            if (listNews && listNews.length > 0) {
                setListNews(listNews);
                setIndex(index + 1);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handleLoadFormerNews = async (categoryId) => {
        try {
            if (index > 1) {
                console.log(index);
                const formerNews = await fetchNews(
                    6,
                    (index - 2) * 6,
                    categoryId
                );
                setIndex(index - 1);
                console.log(formerNews);
                if (formerNews && formerNews.length > 0) {
                    setListNews(formerNews);
                }
                setHasMore(true);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (listNews && listNews != []) {
            let listactions = [
                ...listNews.map((news, index) => [
                    `mở bài báo số ${index + 1}`,
                    () => navigate(`/article/${news.id}`),
                ]),
            ];
            if (index > 1) {
                listactions.push([
                    "xem báo mới hơn",
                    () => handleLoadFormerNews(categoryId),
                ]);
            }
            if (hasMore) {
                listactions.push([
                    "xem thêm",
                    () => handleLoadMoreNews(categoryId),
                ]);
            }
            setActions(listactions);
            // console.log(listactions);
        }
    }, [listNews]);
    useVoiceCommands({
        actions,
        componentName: "Danh mục",
    });
    useSpeechExecutor(actions);
    return (
        <>
            {listNews && listNews.length > 0 ? (
                <>
                    <>
                        <div className="d-flex flex-column">
                            <Link
                                className="card d-flex flex-column hero-card border-0 link-underline link-underline-opacity-0"
                                to={`/article/${listNews[0].id}`} // fix
                            >
                                <img
                                    src={
                                        listNews[0].details.find(
                                            (detail) => detail.type === "image"
                                        )?.imgUrl
                                    }
                                    className="card-img-top img-fluid rounded"
                                />
                                <div className="card-body align-items-center justify-content-center">
                                    <div className="card-text text-truncate-container">
                                        <h3>
                                            <strong>1. </strong>
                                            {listNews[0].title}
                                        </h3>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <hr />
                        <div className="d-flex flex-column" id="CPList">
                            {listNews.slice(1).map((news, index) => (
                                <div className="py-2" key={news.id}>
                                    <Link
                                        className="card d-flex flex-row link-underline link-underline-opacity-0"
                                        to={`/article/${news.id}`}
                                    >
                                        <img
                                            className="card-img-top img-fluid"
                                            src={
                                                news.details.find(
                                                    (detail) =>
                                                        detail.type === "image"
                                                )?.imgUrl
                                            }
                                        ></img>
                                        <div className="card-body overflow-hidden p-3 pt-4 me-2">
                                            <div className="card-text text-truncate-container me-5">
                                                <h5>
                                                    <strong>
                                                        {index + 2}.{" "}
                                                    </strong>
                                                    {news.title}
                                                </h5>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                            <div className="d-flex justify-content-center py-2">
                                {index > 1 && (
                                    <button
                                        type="button"
                                        className="btn btn-dark mx-1"
                                        onClick={() => {
                                            handleLoadFormerNews(categoryId);
                                        }}
                                    >
                                        Mới hớn
                                    </button>
                                )}
                                {hasMore && (
                                    <button
                                        type="button"
                                        className="btn btn-dark mx-1"
                                        onClick={() => {
                                            handleLoadMoreNews(categoryId);
                                        }}
                                    >
                                        Xem thêm
                                    </button>
                                )}
                            </div>
                            {!hasMore && (
                                <>
                                    <p>
                                        <i>
                                            Chưa có bài báo mới, bạn quay lại
                                            sau nhé
                                        </i>
                                    </p>
                                </>
                            )}
                        </div>
                    </>
                </>
            ) : (
                <p>
                    <i>Chưa có bài báo mới, bạn quay lại sau nhé</i>
                </p>
            )}
        </>
    );
};

export default CategoryPageList;
