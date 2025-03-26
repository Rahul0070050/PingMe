"use client";

import { USER_LOGIN_URL } from "@/backend/urls";
import useAxios from "@/hooks/useAxios";
import useFormValidation from "@/hooks/useFormValidation";
import useLocalStorage from "@/hooks/useLocalStorage";
import { validationRules } from "@/utils/formValidationRules";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, FormEvent, ChangeEvent } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [token, setToken] = useLocalStorage("token", null);

  const navigate = useRouter();
  const { loading, fetchData } = useAxios(USER_LOGIN_URL, "POST");

  const { errors, setErrors, validateField, validateForm } = useFormValidation(
    formData,
    validationRules
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedData = { ...prev, [name]: value };
      validateField(name, value, updatedData);
      return updatedData;
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!validateForm(formData)) {
      return;
    }

    try {
      const { data, error } = await fetchData(formData);

      if (error) {
        toast.error(error, {
          position: "top-right",
        });
        return;
      }
      setToken(data.data.token);
      toast.success("Successfuly Loged In", {
        position: "top-right",
      });
      navigate.push("/chat");
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err?.message, {
          position: "top-right",
        });
      }
      setErrors((prev) => ({
        ...prev,
        submit: "Login failed. Please try again.",
      }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 lg:p-8">
      <Toaster />
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-8 transform transition-all hover:shadow-2xl">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Sign In
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Enter your credentials to access your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-400 shadow-sm"
              placeholder="Enter your username"
            />
            {errors.username && (
              <span className="text-xs text-red-600 font-medium">
                {errors.username}
              </span>
            )}
          </div>

          <div className="space-y-1">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-400 shadow-sm"
              placeholder="Enter your password"
            />
            {errors.password && (
              <span className="text-xs text-red-600 font-medium">
                {errors.password}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember"
                className="ml-2 block text-sm text-gray-700"
              >
                Remember me
              </label>
            </div>
            <Link
              href="/forgot-password"
              className="text-sm text-indigo-600 hover:text-indigo-800 transition duration-150"
            >
              Forgot password?
            </Link>
          </div>

          {errors.submit && (
            <div className="text-center bg-red-50 border border-red-200 rounded-lg p-2">
              <span className="text-sm text-red-600 font-medium">
                {errors.submit}
              </span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 bg-indigo-600 text-white rounded-lg font-semibold shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="text-indigo-600 hover:text-indigo-800 font-medium transition duration-150"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
