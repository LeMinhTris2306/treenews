import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useArticle } from "../utils/hooks/useArticle";
import ArticleList from "../components/Home/ArticleList";
import { useNavigate } from "react-router-dom";
import { useVoiceCommands } from "../utils/hooks/useVoiceCommand";
import { useSpeechExecutor } from "../utils/hooks/useSpeechExecutor";

const Home = () => {
    const navigate = useNavigate();
    const [listNews, setListNews] = useState(null);
    const { getListArticle } = useArticle();
    const [actions, setActions] = useState([]);

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

    useEffect(() => {
        if (listNews && listNews != []) {
            let listactions = [];
            listactions = listNews.map((news, index) => [
                index < 4
                    ? `mở bài báo mới nhất số ${index + 1}`
                    : `mở bài báo nóng số ${index - 3}`,
                () => navigate(`/article/${news.id}`),
            ]);
            setActions(listactions);
            // console.log(listactions);
        }
    }, [listNews]);

    useVoiceCommands({
        actions,
        componentName: "Trang chủ",
    });
    useSpeechExecutor(actions);
    return (
        <>
            <div className="container-sm" id="home">
                {listNews ? (
                    <div id="top-art-container">
                        <div className="p-2 breadcrumb" id="breadcrumb-top">
                            <h1>Tin mới nhất</h1>
                        </div>
                        <div className="row">
                            <div
                                className="col-xl-6 p-2 hoveractive"
                                id="top-article"
                            >
                                <Link
                                    className="card p-2 link-underline link-underline-opacity-0"
                                    to={`/article/${listNews[0].id}`}
                                >
                                    <img
                                        src={
                                            listNews[0].details.find(
                                                (detail) =>
                                                    detail.type === "image"
                                            )?.imgUrl
                                        }
                                        className="card-img-top"
                                    ></img>
                                    <div className="card-body p-2 overflow-hidden">
                                        <h4 className="card-text">
                                            {listNews[0].title}
                                        </h4>
                                    </div>
                                </Link>
                            </div>
                            <div className="col-xl-6">
                                {/* side-top-art , max chars = 102*/}
                                <div className="d-flex flex-column">
                                    {listNews.slice(1, 4).map((news) => (
                                        <div
                                            className="p-2 hoveractive"
                                            key={news.id}
                                        >
                                            <Link
                                                className="card p-1 side-content d-flex flex-row link-offset-2 link-underline link-underline-opacity-0"
                                                to={`/article/${news.id}`}
                                            >
                                                <div>
                                                    <img
                                                        className="card-img-top rounded"
                                                        src={
                                                            news.details.find(
                                                                (detail) =>
                                                                    detail.type ===
                                                                    "image"
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
                        <div className="mt-5 breadcrumb" id="breadcrumb-top">
                            <h3>Tin nóng</h3>
                        </div>

                        <ArticleList listNews={listNews.slice(4)} />
                    </div>
                ) : (
                    <p>loading...</p>
                )}
            </div>
        </>
    );
};

export default Home;
