import React, { useState, useEffect } from "react";
import { useArticle } from "../utils/hook/useArticle";
import { useCategory } from "../utils/hook/useCategory";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../utils/hook/useAlert";

const ArticlesPage = () => {
    const renderPagination = (noPage) => {
        const handlePageChange = (option) => {
            if (option === "next" && currentPage < noPage - 1)
                setCurrentPage(currentPage + 1);
            else if (option === "previous" && currentPage > 0)
                setCurrentPage(currentPage - 1);
        };
        const tmpArray = Array.from({ length: noPage }, (_, index) => index);
        return (
            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                    <li className="page-item">
                        <button
                            className="page-link"
                            aria-label="Previous"
                            type="button"
                            onClick={() => handlePageChange("previous")}
                        >
                            <span aria-hidden="true">&laquo;</span>
                            <span className="sr-only">Previous</span>
                        </button>
                    </li>
                    {tmpArray.map((key, index) => (
                        <li className="page-item" key={key}>
                            <button
                                className="page-link"
                                type="button"
                                onClick={() => setCurrentPage(index)}
                            >
                                {index}
                            </button>
                        </li>
                    ))}
                    <li className="page-item">
                        <button
                            className="page-link"
                            type="button"
                            aria-label="Next"
                            onClick={() => handlePageChange("next")}
                        >
                            <span aria-hidden="true">&raquo;</span>
                            <span className="sr-only">Next</span>
                        </button>
                    </li>
                </ul>
            </nav>
        );
    };

    const { getListArticleInfo, deleteArticle } = useArticle();
    const { getListCategory } = useCategory();
    const alert = useAlert();
    const [listNews, setListNews] = useState([]);
    const [noPage, setNoPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [displayNews, setDisplayNews] = useState(null);
    const [listCategories, setListCategories] = useState([]);
    const [searchData, setSearchData] = useState({
        keyword: "",
        categoryName: "",
    });
    const navigate = useNavigate();

    const fetchListNews = async (n, skip) => {
        const response = await getListArticleInfo(n, skip);
        if (response) {
            setListNews(response);
            setDisplayNews(response);
        }
    };

    const fetchCategories = async () => {
        const response = await getListCategory();
        if (response) {
            setListCategories(response.categories);
        }
    };

    //initial fetch
    useEffect(() => {
        fetchListNews(0, 0);
        fetchCategories();
    }, []);

    useEffect(() => {
        if (displayNews && displayNews != []) {
            setNoPage(Math.ceil(displayNews.length / 20));
        }
    }, [displayNews]);

    const onSearch = () => {
        const { keyword, categoryName } = searchData;

        const result = listNews.filter((article) => {
            const matchKeyword = keyword
                ? article.title.toLowerCase().includes(keyword.toLowerCase())
                : true;

            const matchCategory = categoryName
                ? article.categoryName === categoryName
                : true;

            return matchKeyword && matchCategory;
        });
        setDisplayNews(result);
        setCurrentPage(0); // reset lại trang về 0 khi tìm kiếm
    };

    const handleDelete = async (id) => {
        const result = confirm("Xác nhận xóa bài báo?");
        if (result) {
            try {
                const response = await deleteArticle(id);
                if (response.type === "success") {
                    alert.success(response.message);
                } else if (response.type === "danger") {
                    alert.danger(response.message);
                } else {
                    alert.warning("Có lỗi đã xảy ra, vui lòng thử lại sau");
                }
                fetchListNews(0, 0);
            } catch (error) {
                console.log(error);
            }
        }
    };
    return (
        <div className="warpper">
            <div className="container bg-body-tertiary pt-5">
                <div id="page-header">
                    <h3>Quản lí bài báo</h3>
                </div>
                <hr />
                <div className="" id="article-manage-content">
                    <div id="article-filter" className="">
                        <nav className="navbar navbar-light bg-light px-2 d-flex justify-content-end">
                            <div className="form-inline m-2">
                                <input
                                    className="form-control mr-sm-2"
                                    type="search"
                                    placeholder="Tìm tên bài báo"
                                    aria-label="Search"
                                    value={searchData.keyword}
                                    onChange={(e) =>
                                        setSearchData({
                                            ...searchData,
                                            keyword: e.target.value,
                                        })
                                    }
                                />
                            </div>

                            <div className="m-2">
                                <select
                                    className="form-select"
                                    aria-label="User type"
                                    value={searchData.categoryName}
                                    onChange={(e) =>
                                        setSearchData({
                                            ...searchData,
                                            categoryName: e.target.value,
                                        })
                                    }
                                >
                                    <option value="">-- Thể loại --</option>
                                    {listCategories.length > 0 &&
                                        listCategories.map((category) => (
                                            <option
                                                value={category.categoryName}
                                                key={category.id}
                                            >
                                                {category.categoryName}
                                            </option>
                                        ))}
                                </select>
                            </div>

                            <button
                                className="btn btn-outline-success m-2 my-sm-0"
                                type="button"
                                onClick={() => {
                                    onSearch();
                                }}
                            >
                                Tìm
                            </button>
                        </nav>
                    </div>
                    <div id="article-table">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Tên bài báo</th>
                                    <th scope="col">Tác giả</th>
                                    <th scope="col">Thể loại</th>
                                    <th scope="col">Ngày đăng</th>
                                    <th scope="col">
                                        <button
                                            className="btn btn-outline-primary mx-1"
                                            onClick={() =>
                                                navigate("/createarticle")
                                            }
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                height="24px"
                                                viewBox="0 -960 960 960"
                                                width="24px"
                                                fill="#000000"
                                            >
                                                <path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z" />
                                            </svg>
                                        </button>
                                    </th>
                                </tr>
                            </thead>
                            {displayNews && displayNews != [] && (
                                <tbody>
                                    {displayNews
                                        .slice(
                                            currentPage * 20,
                                            (currentPage + 1) * 20
                                        )
                                        .map((news, index) => (
                                            <tr
                                                key={news._id}
                                                onClick={() =>
                                                    navigate(
                                                        `/article/${news._id}`
                                                    )
                                                }
                                                style={{ cursor: "pointer" }}
                                            >
                                                <th scope="row">{index + 1}</th>
                                                <td>{news.title}</td>
                                                <td>{news.authorName}</td>
                                                <td>{news.categoryName}</td>
                                                <td>{news.uploadDay}</td>

                                                <td>
                                                    <div className="d-flex flex-row">
                                                        <button
                                                            className="btn btn-outline-danger mx-1"
                                                            onClick={(e) => {
                                                                e.stopPropagation(); // ngăn click lan ra dòng
                                                                handleDelete(
                                                                    news._id
                                                                );
                                                            }}
                                                        >
                                                            {/* icon delete */}
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                height="24px"
                                                                viewBox="0 -960 960 960"
                                                                width="24px"
                                                                fill="#1f1f1f"
                                                            >
                                                                <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                                                            </svg>
                                                        </button>
                                                        <button
                                                            className="btn btn-outline-primary mx-1"
                                                            onClick={(e) => {
                                                                e.stopPropagation(); // ngăn click lan ra dòng
                                                                navigate(
                                                                    `/edit/${news._id}`
                                                                );
                                                            }}
                                                        >
                                                            {/* icon edit */}
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                height="24px"
                                                                viewBox="0 -960 960 960"
                                                                width="24px"
                                                                fill="#1f1f1f"
                                                            >
                                                                <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            )}
                        </table>
                    </div>
                    {renderPagination(noPage)}
                </div>
            </div>
        </div>
    );
};

export default ArticlesPage;
