import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./RegisterForm.css";

const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  full_name: yup.string().required("Full Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(10, "Password must be at least 10 characters").required("Password is required"),
  confirm_password: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required("Confirm Password is required"),
  date_of_birth: yup.date().required("Date of Birth is required"),
  profile_avatar: yup.string().url("Invalid URL").nullable(),
});

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    // Chuyển đổi ngày sinh sang định dạng ISO 8601
    const formattedData = {
      username: data.username,
      full_name: data.full_name,
      email: data.email,
      password: data.password,
      date_of_birth: new Date(data.date_of_birth).toISOString(), // Định dạng ISO 8601
      profile_avatar: data.profile_avatar || "",
    };

    try {
      const response = await fetch("http://localhost:8080/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });

      if (response.ok) {
        toast.success("Register successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Registration failed.");
      }
    } catch (error) {
      toast.error("Network error. Please try again.");
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit(onSubmit)} className="register-form">
        <h2>Registration</h2>
        <div className="form-group">
          <input placeholder="Enter your name" {...register("username")} />
          <p>{errors.username?.message}</p>
        </div>

        <div className="form-group">
          <input placeholder="Enter your full name" {...register("full_name")} />
          <p>{errors.full_name?.message}</p>
        </div>

        <div className="form-group">
          <input placeholder="Enter your email" type="email" {...register("email")} />
          <p>{errors.email?.message}</p>
        </div>

        <div className="form-group">
          <input placeholder="Create password" type="password" {...register("password")} />
          <p>{errors.password?.message}</p>
        </div>

        <div className="form-group">
          <input placeholder="Confirm password" type="password" {...register("confirm_password")} />
          <p>{errors.confirm_password?.message}</p>
        </div>

        <div className="form-group">
          <input placeholder="Enter your date of birth" type="date" {...register("date_of_birth")} />
          <p>{errors.date_of_birth?.message}</p>
        </div>

        <div className="form-group">
          <input placeholder="Enter your profile avatar URL" {...register("profile_avatar")} />
          <p>{errors.profile_avatar?.message}</p>
        </div>

        <div className="form-group">
          <input type="checkbox" {...register("terms")} />
          <label>I accept all terms & conditions</label>
        </div>

        <button type="submit" className="register-button">Register Now</button>
        <p className="login-link">Already have an account? <a href="/">Login now</a></p>
      </form>
      <ToastContainer />
    </div>
  );
};

export default RegisterForm;
