import React from "react";

import HotNews from "../components/Home/HotNews";
import HotCategoryNews from "../components/Home/HotCategoryNews";

const Home = () => {
    return (
        <>
            <div className="container-sm" id="home">
                <div id="top-art-container">
                    <HotNews />
                </div>

                <HotCategoryNews />
            </div>
        </>
    );
};

export default Home;
