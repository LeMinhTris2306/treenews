import { useState, useEffect } from "react";
import { useCategory } from "../utils/hook/useCategory";
import { useForm } from "react-hook-form";
import { useAlert } from "../utils/hook/useAlert";

const CategoryPage = () => {
    const { getListCategory, updateCategory, deleteCategory, createCategory } =
        useCategory();
    const alert = useAlert();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        reset,
    } = useForm();
    const [categories, setCategories] = useState(null);

    const fetchCategories = async (n) => {
        const response = await getListCategory(n);

        if (response) setCategories(response.categories);
    };
    useEffect(() => {
        fetchCategories(100);
    }, []);

    const onSubmit = async (data) => {
        console.log(data);
        const result = await createCategory(data);
        console.log(result);
        try {
            if (result.type == "danger") {
                setError("categoryName", {
                    type: "manual",
                    message: result.message,
                });
            } else {
                alert.success(result.message);
            }
        } catch (error) {
            console.log(error);
        } finally {
            fetchCategories(100);
        }
    };

    const handleDelete = async (id) => {
        const result = confirm("Xác nhận xóa thể loại?");
        if (result) {
            try {
                const response = await deleteCategory(id);
                console.log(response);
                if (response.type === "success") {
                    alert.success(response.message);
                } else if (response.type === "danger") {
                    alert.danger(response.message);
                } else {
                    alert.warning("Có lỗi đã xảy ra, vui lòng thử lại sau");
                }
                fetchCategories(100);
            } catch (error) {
                console.log(error);
            }
        }
    };
    return (
        <div className="warpper">
            <div className="container bg-body-tertiary pt-5">
                <div id="page-header">
                    <h3>Quản lí thể loại</h3>
                </div>
                <hr />

                {categories ? (
                    <div id="user-manage-content">
                        <div id="user-table">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Tên thể loại</th>
                                        <th scope="col">Tên hiển thị</th>
                                        <th scope="col">
                                            <button
                                                className="btn btn-outline-primary mx-1"
                                                type="button"
                                                data-bs-toggle="modal"
                                                data-bs-target="#createUserModal"
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
                                            <div
                                                className="modal fade"
                                                id="createUserModal"
                                                data-bs-backdrop="static"
                                                data-bs-keyboard="false"
                                                tabIndex="-1"
                                                aria-labelledby="createUserLabel"
                                                aria-hidden="true"
                                            >
                                                <div className="modal-dialog modal-dialog-centered">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h1
                                                                className="modal-title fs-5"
                                                                id="createUserLabel"
                                                            >
                                                                Thêm thể loại
                                                            </h1>
                                                            <button
                                                                type="button"
                                                                className="btn-close"
                                                                data-bs-dismiss="modal"
                                                                aria-label="Close"
                                                                onClick={() =>
                                                                    reset()
                                                                }
                                                            ></button>
                                                        </div>
                                                        <div className="modal-body">
                                                            <form
                                                                onSubmit={handleSubmit(
                                                                    onSubmit
                                                                )}
                                                            >
                                                                <div className="d-flex flex-column">
                                                                    <div className="form-floating mt-4">
                                                                        <input
                                                                            type="text"
                                                                            id="createCategoryModalCategoryName"
                                                                            className="form-control"
                                                                            placeholder="Tên thể loại"
                                                                            {...register(
                                                                                "categoryName",
                                                                                {
                                                                                    required:
                                                                                        "Email không được bỏ trống",
                                                                                }
                                                                            )}
                                                                        />
                                                                        <label
                                                                            className="form-label"
                                                                            htmlFor="createCategoryModalCategoryName"
                                                                        >
                                                                            Tên
                                                                            thể
                                                                            loại
                                                                        </label>
                                                                        {errors.categoryName && (
                                                                            <p className="text-start warning">
                                                                                {
                                                                                    errors
                                                                                        .categoryName
                                                                                        .message
                                                                                }
                                                                            </p>
                                                                        )}
                                                                    </div>
                                                                    <div className="form-floating mt-4">
                                                                        <input
                                                                            type="text"
                                                                            id="createCategoryModalUrlDisplay"
                                                                            className="form-control"
                                                                            placeholder="url hiển thị"
                                                                            {...register(
                                                                                "urlDisplay",
                                                                                {
                                                                                    required:
                                                                                        "tên hiển thị không được bỏ trống",
                                                                                }
                                                                            )}
                                                                        />
                                                                        <label
                                                                            className="form-label"
                                                                            htmlFor="createCategoryModalUrlDisplay"
                                                                        >
                                                                            Tên
                                                                            hiển
                                                                            thị
                                                                        </label>
                                                                        <p>
                                                                            ví
                                                                            dụ:
                                                                            the-thao-trong-nuoc
                                                                        </p>
                                                                        {errors.categoryName && (
                                                                            <p className="text-start warning">
                                                                                {
                                                                                    errors
                                                                                        .categoryName
                                                                                        .message
                                                                                }
                                                                            </p>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                                <div className="mt-2 d-flex flex-row">
                                                                    <button
                                                                        className="btn btn-danger me-2"
                                                                        type="button"
                                                                        data-bs-dismiss="modal"
                                                                        onClick={() =>
                                                                            reset()
                                                                        }
                                                                    >
                                                                        Hủy
                                                                    </button>
                                                                    <button
                                                                        className="btn btn-primary"
                                                                        type="submit"
                                                                    >
                                                                        Thêm
                                                                    </button>
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories.map((category, index) => (
                                        <tr key={category.id}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{category.categoryName}</td>
                                            <td>{category.urlDisplay}</td>
                                            <td>
                                                <div className="d-flex flex-row">
                                                    <button
                                                        className="btn btn-danger mx-1"
                                                        onClick={(e) => {
                                                            e.stopPropagation(); // ngăn click lan ra dòng
                                                            handleDelete(
                                                                category.id
                                                            );
                                                        }}
                                                    >
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
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <p>loading...</p>
                )}
            </div>
        </div>
    );
};

export default CategoryPage;
