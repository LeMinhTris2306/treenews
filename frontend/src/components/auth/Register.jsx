import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useUser } from "../../utils/hooks/useUser";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const { createUser } = useUser();
  const invalidCharactersRegex = /[.\/$?!]/;
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
  } = useForm();

  const [loading, setLoading] = useState(false); // Loading state

  const onSubmit = async (RegisterData) => {
    console.log(RegisterData);
    const result = await createUser(RegisterData);

    try {
      if (result.error) {
        setError("email", {
          type: "manual",
          message: "Email này đã được sử dụng",
        });
      } else {
        alert("Đăng ký thành công");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          // id=""
          className="form-control mt-4"
          placeholder="Email"
          {...register("email", { required: "Email không được bỏ trống" })}
        />
        {errors.email && (
          <span className="warning">{errors.email.message}</span>
        )}

        <input
          type="password"
          // id=""
          className="form-control mt-4"
          placeholder="Mật khẩu"
          {...register("password", {
            required: "Thiếu mật khẩu",
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
        {errors.password && <p>{errors.password.message}</p>}

        <input
          type="password"
          name="confirmPassword"
          // id=""
          className="form-control mt-4"
          placeholder="Nhập lại Mật khẩu"
          {...register("confirmPassword", {
            required: "Thiếu nhập lại mật khẩu",
            validate: (value) =>
              value === watch("password") || "Mật khẩu không khớp với nhau",
          })}
        />
        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}

        <input
          type="text"
          name="lastName"
          // id=""
          className="form-control mt-4"
          placeholder="Họ"
          {...register("lastName", { required: "Yêu cầu nhập họ" })}
        />
        {errors.lastName && <p>{errors.lastName.message}</p>}

        <input
          type="text"
          name="firstName"
          // id=""
          className="form-control mt-4"
          placeholder="Tên"
          {...register("firstName", { required: "Yêu cầu nhập tên" })}
        />
        {errors.firstName && <p>{errors.firstName.message}</p>}
        <div className="text-center mt-3">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            Đăng Ký
          </button>
        </div>
      </form>
    </>
  );
};

export default Register;
