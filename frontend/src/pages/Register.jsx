import React from "react";
import { useForm } from "react-hook-form";

import { EMAIL_REGEXP } from "../constant";
import http from "../http";

function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (values) => {
    try {
      const body = {
        username: values.username,
        email: values.email,
        password: values.password,
      };
      await http.post(`/auth/register`, body);
      alert("Successfully registered.");
      window.location.href = "/login";
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Register
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              {...register("username", { required: true })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              placeholder="username"
            />
            <p className="text-sm text-red-500">{errors.username?.message}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              {...register("email", { pattern: EMAIL_REGEXP, required: true })}
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              placeholder="your@email.com"
            />
            <p className="text-sm text-red-500">{errors.email?.message}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              {...register("password", {
                required: true,
                validate: (val) => {
                  if (!/\d/.test(val)) {
                    return "Password must contain a single digit";
                  }
                  if (!/[a-z]/.test(val)) {
                    return "Password must contain one lowercase letter";
                  }
                  if (!/[A-Z]/.test(val)) {
                    return "Password must contain one uppercase letter";
                  }
                  if (!/\W/.test(val)) {
                    return "Password must contain one special character";
                  }
                  if (!/.{8,}/.test(val)) {
                    return "Password must be 8 characters long or more";
                  }
                },
              })}
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              placeholder="••••••••"
            />
            <p className="text-sm text-red-500">{errors.password?.message}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              {...register("confirmPassword", {
                required: true,
                validate: (val) => {
                  if (watch("password") != val) {
                    return "Your passwords do no match";
                  }
                },
              })}
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              placeholder="••••••••"
            />
            <p className="text-sm text-red-500">
              {errors.confirmPassword?.message}
            </p>
          </div>

          <button
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors"
            type="submit"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-indigo-600 hover:text-indigo-500 font-medium"
          >
            Sign in
          </a>
        </div>
      </div>
    </div>
  );
}

export default Register;
