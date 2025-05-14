import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useArticle } from "../utils/hook/useArticle";

import ArticleDetail from "../components/articleInfo/ArticleDetail";

const ArticleInfo = () => {
    const { articleid } = useParams();
    const { getArticle } = useArticle();
    const [article, setArticle] = useState(null);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const articleData = await getArticle(articleid);
                setArticle(articleData);
                console.log(articleData);
            } catch (error) {
                console.error("Error fetching article:", error);
            }
        };
        fetchArticle();
        window.scrollTo(0, 0);
    }, [articleid]);

    return (
        <>
            <div
                className="position-fixed bottom-0 end-0 z-3 mb-3 me-3"
                id="move-to-top"
            >
                <button
                    className="p-2 btn btn-outline-dark border border-1 rounded"
                    onClick={() => window.scrollTo(0, 0)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        fill="currentColor"
                        className="bi bi-arrow-up"
                        viewBox="0 0 16 16"
                    >
                        <path
                            fillRule="evenodd"
                            d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5"
                        />
                    </svg>
                </button>
            </div>
            <div className="container-sm" id="article-main">
                {article ? (
                    <>
                        <ArticleDetail article={article} />
                    </>
                ) : (
                    <p>loading...</p>
                )}
            </div>
        </>
    );
};

export default ArticleInfo;
