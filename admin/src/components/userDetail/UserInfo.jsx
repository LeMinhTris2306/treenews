import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../utils/hook/useUser";
import { useAlert } from "../../utils/hook/useAlert";
import { useLocation } from "react-router-dom";

import UserInfoModal from "./UserInfoModal";
import UserCreatedArticles from "./UserCreatedArticles";

const UserInfo = ({ user }) => {
    const { logout, updateUser } = useUser();
    const alert = useAlert();
    const location = useLocation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [type, setType] = useState("CP");
    const [image, setImage] = useState(
        "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
    );

    const openModal = (type) => {
        setType(type);
        setIsModalOpen(true);
    };
    const closeModal = () => setIsModalOpen(false);

    useEffect(() => {
        if (user.imgUrl) {
            setImage(user.imgUrl);
        }
    }, [user.imgUrl]);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            userType: user.userType, // giá trị mặc định từ props/state
        },
    });

    const onSubmit = async (data) => {
        const result = await updateUser(data, user.id);
        if (result) {
            alert.success("Cập nhật thông tin thành công");
        }
    };

    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate("/");
    };
    return (
        <>
            <section className="">
                <div className="row">
                    <div className="col-lg-4" id="profile-avatar-section">
                        <div className="card mb-4">
                            <div className="card-header">Ảnh</div>
                            <div className="card-body text-center">
                                <img
                                    src={image}
                                    alt="profile-avatar"
                                    className="rounded-circle img-fluid"
                                    id="profile-avatar"
                                    onError={() =>
                                        setImage(
                                            "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                                        )
                                    }
                                />
                                <hr />
                                <div className="d-flex flex-row justify-content-center">
                                    <button
                                        className="btn btn-primary mx-2"
                                        data-bs-toggle="modal"
                                        data-bs-target="#account-modal"
                                        onClick={() => {
                                            openModal("CA");
                                        }}
                                    >
                                        Đổi ảnh
                                    </button>
                                    <button
                                        className="btn btn-primary mx-2"
                                        data-bs-toggle="modal"
                                        data-bs-target="#account-modal"
                                        onClick={() => {
                                            openModal("CP");
                                        }}
                                    >
                                        Đổi mật khẩu
                                    </button>
                                    <UserInfoModal
                                        isOpen={isModalOpen}
                                        onClose={closeModal}
                                        userId={user.id}
                                        modalType={type}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="card mb-6">
                            <div className="card-header">Thông tin</div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="mb-3">
                                        <label
                                            className="small mb-1"
                                            htmlFor="inputEmailAddress"
                                        >
                                            Email address
                                        </label>
                                        <input
                                            className="form-control"
                                            id="inputEmailAddress"
                                            type="email"
                                            defaultValue={user.email}
                                            disabled
                                            readOnly
                                        />
                                    </div>
                                    <div className="row gx-3 mb-3">
                                        <div className="col-md-6">
                                            <label
                                                className="small mb-1"
                                                htmlFor="inputFirstName"
                                            >
                                                First name
                                            </label>
                                            <input
                                                className="form-control"
                                                id="inputFirstName"
                                                type="text"
                                                defaultValue={user.firstName}
                                                {...register("firstName", {
                                                    required:
                                                        "Không được bỏ trống",
                                                })}
                                            />
                                        </div>

                                        <div className="col-md-6">
                                            <label
                                                className="small mb-1"
                                                htmlFor="inputLastName"
                                            >
                                                Last name
                                            </label>
                                            <input
                                                className="form-control"
                                                id="inputLastName"
                                                type="text"
                                                defaultValue={user.lastName}
                                                {...register("lastName", {
                                                    required:
                                                        "Không được bỏ trống",
                                                })}
                                            />
                                        </div>
                                    </div>

                                    <div className="row gx-3 mb-3">
                                        <div className="col-md-6">
                                            <label
                                                className="small mb-1"
                                                htmlFor="inputPhone"
                                            >
                                                Phone number
                                            </label>
                                            <input
                                                className="form-control"
                                                id="inputPhone"
                                                type="tel"
                                                defaultValue={user.phoneNumber}
                                                {...register("phoneNumber")}
                                            />
                                        </div>

                                        <div className="col-md-6">
                                            <label
                                                className="small mb-1"
                                                htmlFor="inputBirthday"
                                            >
                                                Birthday
                                            </label>
                                            <input
                                                className="form-control"
                                                id="inputBirthday"
                                                type="text"
                                                name="birthday"
                                                defaultValue={user.birthday}
                                                {...register("birthday")}
                                            />
                                        </div>
                                    </div>

                                    <div className="row gx-3 mb-3">
                                        <div className="col-md-6">
                                            <select
                                                className="form-select"
                                                aria-label="User type"
                                                {...register("userType")}
                                            >
                                                <option value="" disabled>
                                                    Open this select menu
                                                </option>
                                                {[
                                                    "Admin",
                                                    "Author",
                                                    "Reader",
                                                ].map((userType) => (
                                                    <option
                                                        key={userType}
                                                        value={userType}
                                                    >
                                                        {userType}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <button
                                        className="btn btn-primary"
                                        type="submit"
                                    >
                                        Lưu thay đổi
                                    </button>
                                </form>
                            </div>
                            {location.pathname === "/admin" && (
                                <div className="card-footer">
                                    <div className="row">
                                        <div className="col">
                                            <button
                                                className="btn btn-primary"
                                                onClick={handleLogout}
                                            >
                                                Đăng xuất
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <UserCreatedArticles author={user.id} />
            </section>
        </>
    );
};

export default UserInfo;
