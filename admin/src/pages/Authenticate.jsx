import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useUser } from "../utils/hook/useUser";
import { useAlert } from "../utils/hook/useAlert";
import { useNavigate } from "react-router-dom";

const Authenticate = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [loading, setLoading] = useState(false);
    const alert = useAlert();
    const { login } = useUser();
    const navigate = useNavigate();

    const onSubmit = async (loginData) => {
        setLoading(true); // Set loading state
        console.log(loginData);
        try {
            const result = await login(loginData);
            console.log(result);
            if (result === true) {
                alert.success("Đăng nhập thành công");
                navigate("/");
            } else {
                alert.danger(result.message);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            <section className="vh-100" style={{ backgroundColor: "#fcc09f" }}>
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        {loading && (
                            <div
                                className="spinner-border position-fixed bottom-50 z-3"
                                role="status"
                            >
                                <span className="visually-hidden">
                                    Loading...
                                </span>
                            </div>
                        )}
                        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                            <div className="card shadow-2-strong ">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div
                                        className={`card-body p-5 text-center ${
                                            loading && "opacity-25"
                                        }`}
                                    >
                                        <svg
                                            className="mx-auto my-3 bi bi-person-circle"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="50"
                                            height="50"
                                            fill="currentColor"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                            <path
                                                fillRule="evenodd"
                                                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                                            />
                                        </svg>

                                        <div className="form-floating mb-4">
                                            <input
                                                type="email"
                                                id="Email"
                                                className="form-control form-control-lg"
                                                placeholder="Email"
                                                {...register("email", {
                                                    required: true,
                                                })}
                                            />
                                            <label
                                                className="form-label"
                                                htmlFor="Email"
                                            >
                                                Email
                                            </label>
                                        </div>
                                        {errors.email && (
                                            <span>Thiếu Email</span>
                                        )}

                                        <div className="form-floating mb-4">
                                            <input
                                                type="password"
                                                id="Password"
                                                className="form-control form-control-lg"
                                                placeholder="Mật khẩu"
                                                {...register("password", {
                                                    required: true,
                                                })}
                                            />
                                            <label
                                                className="form-label"
                                                htmlFor="Password"
                                            >
                                                Mật khẩu
                                            </label>
                                        </div>
                                        {errors.password && (
                                            <span>Thiếu mật khẩu</span>
                                        )}
                                        <button
                                            className="btn btn-primary btn-lg btn-block"
                                            type="submit"
                                            onClick={() => setLoading(!loading)}
                                        >
                                            Đăng nhập
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Authenticate;
