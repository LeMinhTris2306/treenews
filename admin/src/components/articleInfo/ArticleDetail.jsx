import React, { useState, useRef, useEffect } from "react";

const ArticleDetail = (props) => {
    const { article } = props;
    const audioRef = useRef(null);
    // const handlePlay = () => {
    //     if (article.record && audioRef.current) {
    //         audioRef.current.play();
    //     }
    // };

    // const handlePause = () => {
    //     if (article.record && audioRef.current) {
    //         audioRef.current.pause();
    //     }
    // };

    // const handleReplay = () => {
    //     if (article.record && audioRef.current) {
    //         audioRef.current.pause();
    //         audioRef.current.currentTime = 0;
    //         audioRef.current.play();
    //     }
    // };

    return (
        <>
            <div className="d-flex flex-column">
                <div className="card pt-2">
                    <div className="card-header">
                        <h2>
                            <strong>{article.title}</strong>
                        </h2>
                        <div
                            className="d-flex flex-row pt-4"
                            id="article-author"
                        >
                            <p className="">{article.authorId}</p>
                            <p className="mx-2 ">{article.uploadDay}</p>
                        </div>
                        {article.record && (
                            <div>
                                <audio
                                    controls
                                    src={article.record}
                                    ref={audioRef}
                                    type="audio/wav"
                                    className="w-100"
                                ></audio>
                            </div>
                        )}
                    </div>
                    <div className="card-body">
                        {article.details.map((detail, index) => (
                            <div key={index}>
                                {/* {may be add h1 tag here} */}
                                {detail.type === "text" &&
                                    detail.detail.map((text, textIndex) => (
                                        <p key={textIndex}>{text}</p>
                                    ))}
                                {detail.type === "image" && (
                                    <>
                                        <div className="image-detail">
                                            <img
                                                className="card-img-top img-fluid rounded"
                                                src={detail.imgUrl}
                                            ></img>
                                            <p className="mt-1 ms-2">
                                                <em>{detail.imgTitle}</em>
                                            </p>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ArticleDetail;
