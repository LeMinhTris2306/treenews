import { useState, useEffect } from "react";
import { useUser } from "../utils/hook/useUser";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAlert } from "../utils/hook/useAlert";

const UserPage = () => {
    const { getUsers, createUser, deleteUser } = useUser();
    const alert = useAlert();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        reset,
    } = useForm();
    const [users, setUsers] = useState(null);

    const fetchUsers = async (n) => {
        const response = await getUsers(n);

        if (response) setUsers(response.users);
    };
    useEffect(() => {
        fetchUsers(100);
    }, []);

    const onSubmit = async (RegisterData) => {
        console.log(RegisterData);
        const result = await createUser(RegisterData);

        try {
            if (result.type == "danger") {
                setError("email", {
                    type: "manual",
                    message: result.message,
                });
            } else {
                alert.success(result.message);
            }
        } catch (error) {
            console.log(error);
        } finally {
            fetchUsers(100);
        }
    };

    const handleDelete = async (id) => {
        const result = confirm("Xác nhận xóa người dùng?");
        if (result) {
            try {
                const response = await deleteUser(id);
                console.log(response);
                if (response.type === "success") {
                    alert.success(response.message);
                } else if (response.type === "danger") {
                    alert.danger(response.message);
                } else {
                    alert.warning("Có lỗi đã xảy ra, vui lòng thử lại sau");
                }
                fetchUsers(100);
            } catch (error) {
                console.log(error);
            }
        }
    };
    return (
        <div className="warpper">
            <div className="container bg-body-tertiary pt-5">
                <div id="page-header">
                    <h3>Quản lí người dùng</h3>
                </div>
                <hr />

                {users ? (
                    <div id="user-manage-content">
                        <div id="user-table">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Họ</th>
                                        <th scope="col">Tên</th>
                                        <th scope="col">Phân loại</th>
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
                                                                Thêm User
                                                            </h1>
                                                            <button
                                                                type="button"
                                                                className="btn-close"
                                                                data-bs-dismiss="modal"
                                                                aria-label="Close"
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
                                                                            id="createUserModalEmail"
                                                                            className="form-control"
                                                                            placeholder="Email"
                                                                            {...register(
                                                                                "email",
                                                                                {
                                                                                    required:
                                                                                        "Email không được bỏ trống",
                                                                                }
                                                                            )}
                                                                        />
                                                                        <label
                                                                            className="form-label"
                                                                            htmlFor="createUserModalEmail"
                                                                        >
                                                                            Email
                                                                        </label>
                                                                        {errors.email && (
                                                                            <p className="text-start warning">
                                                                                {
                                                                                    errors
                                                                                        .email
                                                                                        .message
                                                                                }
                                                                            </p>
                                                                        )}
                                                                    </div>
                                                                    <div className="form-floating mt-4">
                                                                        <input
                                                                            type="text"
                                                                            id="createUserModalPassword"
                                                                            className="form-control"
                                                                            placeholder="Mật khẩu"
                                                                            {...register(
                                                                                "password",
                                                                                {
                                                                                    required:
                                                                                        "Mật khẩu không được bỏ trống",
                                                                                }
                                                                            )}
                                                                        />
                                                                        <label
                                                                            className="form-label"
                                                                            htmlFor="createUserModalPassword"
                                                                        >
                                                                            Mật
                                                                            khẩu
                                                                        </label>
                                                                        {errors.password && (
                                                                            <p className="text-start warning">
                                                                                {
                                                                                    errors
                                                                                        .password
                                                                                        .message
                                                                                }
                                                                            </p>
                                                                        )}
                                                                    </div>
                                                                    <div className="d-flex flex-row mt-4">
                                                                        <div className="form-floating me-2">
                                                                            <input
                                                                                type="text"
                                                                                id="createUserModalLastName"
                                                                                className="form-control me-2"
                                                                                placeholder="Họ"
                                                                                {...register(
                                                                                    "lastName",
                                                                                    {
                                                                                        required:
                                                                                            "Họ không được bỏ trống",
                                                                                    }
                                                                                )}
                                                                            />
                                                                            <label
                                                                                className="form-label"
                                                                                htmlFor="createUserModalLastName"
                                                                            >
                                                                                Họ
                                                                            </label>
                                                                            {errors.lastName && (
                                                                                <p className="text-start warning">
                                                                                    {
                                                                                        errors
                                                                                            .lastName
                                                                                            .message
                                                                                    }
                                                                                </p>
                                                                            )}
                                                                        </div>
                                                                        <div className="form-floating ms-2">
                                                                            <input
                                                                                type="text"
                                                                                id="createUserModalFirstName"
                                                                                className="form-control me-2"
                                                                                placeholder="Tên"
                                                                                {...register(
                                                                                    "firstName",
                                                                                    {
                                                                                        required:
                                                                                            "Họ không được bỏ trống",
                                                                                    }
                                                                                )}
                                                                            />
                                                                            <label
                                                                                className="form-label"
                                                                                htmlFor="createUserModalFirstName"
                                                                            >
                                                                                Tên
                                                                            </label>
                                                                            {errors.firstName && (
                                                                                <p className="text-start warning">
                                                                                    {
                                                                                        errors
                                                                                            .firstName
                                                                                            .message
                                                                                    }
                                                                                </p>
                                                                            )}
                                                                        </div>
                                                                    </div>

                                                                    <input
                                                                        type="number"
                                                                        // id=""
                                                                        className="form-control mt-4"
                                                                        placeholder="Số điện thoại"
                                                                        {...register(
                                                                            "phoneNumber"
                                                                        )}
                                                                    />
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
                                    {users.map((user, index) => (
                                        <tr
                                            key={user.id}
                                            onClick={() =>
                                                navigate(`/user/${user.id}`)
                                            }
                                        >
                                            <th scope="row">{index + 1}</th>
                                            <td>{user.email}</td>
                                            <td>{user.lastName}</td>
                                            <td>{user.firstName}</td>
                                            <td>{user.userType}</td>
                                            <td>
                                                <div className="d-flex flex-row">
                                                    <button
                                                        className="btn btn-danger mx-1"
                                                        onClick={(e) => {
                                                            e.stopPropagation(); // ngăn click lan ra dòng
                                                            handleDelete(
                                                                user.id
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

export default UserPage;
