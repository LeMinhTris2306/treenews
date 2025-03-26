import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../utils/hooks/useUser";
import { selectCurrentUser } from "../../store/reducers/userSlice";

const Login = () => {
  const { login } = useUser();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false); // Loading state
  const [loginError, setLoginError] = useState(""); // General login error message

  const onSubmit = async (loginData) => {
    setLoading(true); // Set loading state
    setLoginError("");

    try {
      const user = await login(loginData);
      console.log(user);
      if (user === true) {
        alert("Đăng nhập thành công");
        navigate("/");
      } else {
        setLoginError("Thông tin đăng nhập không chính xác");
      }
    } catch (error) {
      console.log(error);
      setLoginError(
        error.message || "Có lỗi đã xảy ra, vui lòng đăng nhập lại sau"
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          name=""
          // id=""
          className="form-control my-4 py-2"
          placeholder="Email"
          {...register("email", { required: true })}
        />
        {errors.email && <span>Thiếu Email</span>}
        <input
          type="password"
          name=""
          // id=""
          className="form-control my-4 py-2"
          placeholder="Mật khẩu"
          {...register("password", { required: true })}
        />
        {errors.password && <span>Thiếu mật khẩu</span>}
        <div className="text-center mt-3">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            Đăng nhập
          </button>
        </div>
      </form>
    </>
  );
};

export default Login;
