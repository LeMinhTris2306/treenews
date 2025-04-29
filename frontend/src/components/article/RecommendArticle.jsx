import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useArticle } from "../../utils/hooks/useArticle";
import { useVoiceCommands } from "../../utils/hooks/useVoiceCommand";
import { useSpeechExecutor } from "../../utils/hooks/useSpeechExecutor";

const RecommendArticle = (props) => {
    const navigate = useNavigate();
    const { categoryId, title, setSubActions } = props;
    const [listNews, setListNews] = useState([]);
    const [actions, setActions] = useState([]);
    const [loading, setLoading] = useState(false);
    // const [actions, setActions] = useState([]);
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
        setLoading(true);
        fetchNews(5, 0, categoryId);
        setLoading(false);
    }, [title]);

    useEffect(() => {
        if (listNews && !loading) {
            let listActions = [
                ...listNews.map((news, index) => [
                    `mở bài báo số ${index + 1}`,
                    () => navigate(`/article/${news.id}`),
                ]),
            ];
            setActions(listActions);
        }
    }, [listNews, loading]);

    useVoiceCommands({
        actions,
        componentName: "Xem thêm",
    });
    useSpeechExecutor(actions, "Xem thêm");
    return (
        <>
            {!loading && (
                <div className="d-flex flex-column" id="recommend">
                    {/* {listNews && listNews.map((news) => console.log(Object.entries(news)))} */}
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
                                        news.details.find(
                                            (detail) => detail.type === "image"
                                        )?.imgUrl
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
            )}
        </>
    );
};

export default RecommendArticle;
