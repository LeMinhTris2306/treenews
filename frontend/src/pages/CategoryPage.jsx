import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import CategoryPageList from "../components/categoryPage/CategoryPageList";
import { useCategory } from "../utils/hooks/useCategory";

const CategoryPage = () => {
    const { categoryUrl } = useParams();
    const [category, setCategory] = useState(null);
    const { getCategory } = useCategory();

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await getCategory(categoryUrl);
                setCategory(response);
            } catch (error) {
                console.error("Error fetching category:", error);
            }
        };

        fetchCategory();
    }, [categoryUrl]);

    return (
        <>
            <div className="container-sm" id="category-page">
                {category ? (
                    <>
                        <div className="p-2 breadcrumb" id="breadcrumb-top">
                            <h1>{category.categoryName}</h1>
                        </div>
                        <hr />
                        <CategoryPageList categoryId={category.id} />
                    </>
                ) : (
                    <p className="container-sm" id="category-page">
                        Hiện chưa có bài báo nào, bạn vui lòng quay lại sau
                    </p>
                )}
            </div>
        </>
    );
};

export default CategoryPage;
