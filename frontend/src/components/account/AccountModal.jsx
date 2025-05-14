import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useUser } from "../../utils/hooks/useUser";

const ChangePassword = ({ isModalOpen, onModalClose, id }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        reset,
        watch,
    } = useForm();

    const invalidCharactersRegex = /[.\/$?!]/;
    useEffect(() => {
        if (isModalOpen) {
            reset({
                old_password: "",
                new_password: "",
                confirm_password: "",
            });
        }
    }, [isModalOpen, reset]);
    const { changePassword } = useUser();
    const onSubmit = async (data) => {
        delete data.confirm_password;
        const result = await changePassword(data, id);
        console.log(result);
        if (result.error) {
            setError("old_password", {
                type: "manual",
                message: "Mật khẩu cũ không chính xác",
            });
        }
        //close modal
        else {
            document
                .getElementById("account-modal")
                .classList.remove("show", "d-block");
            document
                .querySelectorAll(".modal-backdrop")
                .forEach((el) => el.classList.remove("modal-backdrop"));
            onModalClose();
        }
    };

    return (
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="changePasswordModal">
                        Đổi mật khẩu
                    </h1>
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        onClick={onModalClose}
                    ></button>
                </div>
                <div className="modal-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input
                            type="text"
                            className="form-control mt-4"
                            name="old_password"
                            placeholder="Mật khẩu cũ"
                            {...register("old_password", {
                                required: "Không được bỏ trống",
                            })}
                        />
                        {errors.old_password && (
                            <p>{errors.old_password.message}</p>
                        )}
                        <input
                            type="text"
                            className="form-control mt-4"
                            placeholder="Mật khẩu mới"
                            name="new_password"
                            {...register("new_password", {
                                required: "Không được bỏ trống",
                                minLength: {
                                    value: 6,
                                    message: "Mật khẩu tối thiểu 6 ký tự",
                                },
                                validate: (value) => {
                                    // Kiểm tra mật khẩu có chứa ký tự không hợp lệ hay không
                                    if (invalidCharactersRegex.test(value)) {
                                        return "Mật khẩu không hợp lệ"; // Trả về thông báo lỗi
                                    }
                                    return true; // Nếu mật khẩu hợp lệ
                                },
                            })}
                        />
                        {errors.new_password && (
                            <p>{errors.new_password.message}</p>
                        )}
                        <input
                            type="text"
                            className="form-control mt-4"
                            placeholder="Nhập lại khẩu mới"
                            name="confirm_password"
                            {...register("confirm_password", {
                                required: "Không được bỏ trống",
                                minLength: {
                                    value: 6,
                                    message: "Mật khẩu tối thiểu 6 ký tự",
                                },
                                validate: (value) =>
                                    value === watch("new_password") ||
                                    "Mật khẩu Nhập lại không chính xác",
                            })}
                        />
                        {errors.confirm_password && (
                            <p>{errors.confirm_password.message}</p>
                        )}
                        <div className="d-flex flex-row my-3">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                                onClick={onModalClose}
                            >
                                Hủy
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary mx-3"
                            >
                                Đổi mật khẩu
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

const ChangeAvatar = ({ isModalOpen, onModalClose, id }) => {
    const [img, setImg] = useState(null);
    const [imgSize, setImgSize] = useState("");
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setError,
    } = useForm();
    const { changeAvatar } = useUser();

    useEffect(() => {
        if (isModalOpen) {
            setImg(null);
            reset({
                image: "",
            });
        }
    }, [isModalOpen, reset]);
    const onSubmit = async (data) => {
        //Kiểm tra size hình ảnh, nếu lớn hơn 5mb sẽ không cập nhật
        if (imgSize > 5) {
            setError("image", {
                type: "manual",
                message: "Hình ảnh lớn hơn 5mb",
            });
        } else {
            const response = await changeAvatar(img, id);
            if (response.error) {
                setError("image", {
                    type: "manual",
                    message: "Có lỗi xảy ra, vui lòng thử lại sau",
                });
            } else {
                document
                    .getElementById("account-modal")
                    .classList.remove("show", "d-block");
                document
                    .querySelectorAll(".modal-backdrop")
                    .forEach((el) => el.classList.remove("modal-backdrop"));
                onModalClose();
            }
        }
    };

    return (
        <>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1
                            className="modal-title fs-5"
                            id="changePasswordModal"
                        >
                            Đổi ảnh
                        </h1>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            onClick={onModalClose}
                        ></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="py-3">
                                {img && (
                                    <img
                                        src={img && URL.createObjectURL(img)}
                                        alt="preview-img"
                                        className="img-fluid"
                                    />
                                )}
                            </div>
                            {img && <div>Size: {imgSize} Mb</div>}
                            {/* nút chọn hình ảnh */}
                            <input
                                type="file"
                                className="filetype pb-1"
                                accept=".jpg, .jpeg, .png, .webp .gif"
                                {...register("image", {
                                    required: "Thiếu ảnh",
                                    onChange: (event) => {
                                        if (
                                            event.target.files &&
                                            event.target.files[0]
                                        ) {
                                            setImg(event.target.files[0]);
                                            setImgSize(
                                                parseFloat(
                                                    (
                                                        event.target.files[0]
                                                            .size /
                                                        (1024 * 1024)
                                                    ).toFixed(2)
                                                )
                                            );
                                        }
                                    },
                                })}
                            />
                            {/**end nút chọn hình ảnh */}
                            {errors.image && (
                                <p className="warning">
                                    {errors.image.message}
                                </p>
                            )}
                            {!errors.image && (
                                <div className="py-1">Ảnh không quá 5mb</div>
                            )}
                            <div className="d-flex flex-row my-3 justify-content-center">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                    onClick={onModalClose}
                                >
                                    Hủy
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-primary mx-3"
                                >
                                    Đổi ảnh
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

const AccountModal = ({ isOpen, onClose, userId, modalType }) => {
    return (
        <>
            <div
                className="modal fade"
                id="account-modal"
                tabIndex="-1"
                aria-hidden="true"
            >
                {modalType === "CP" && (
                    <ChangePassword
                        isModalOpen={isOpen}
                        onModalClose={onClose}
                        id={userId}
                    />
                )}
                {modalType === "CA" && (
                    <ChangeAvatar
                        isModalOpen={isOpen}
                        onModalClose={onClose}
                        id={userId}
                    />
                )}
            </div>
        </>
    );
};

export default AccountModal;
