"use client";
import { useState, FormEvent, ChangeEvent } from "react";
import { useSearchParams } from "next/navigation";
import InputField from "@/components/InputField";
import SubmitButton from "@/components/SubmitButton";
import FormFooter from "@/components/FormFooter";

interface FormData {
  password: string;
  confirmPassword: string;
}

interface Errors {
  password?: string;
  confirmPassword?: string;
  submit?: string;
}

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token"); // Assuming a token is passed in the URL

  const [formData, setFormData] = useState<FormData>({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const validateForm = (): boolean => {
    const tempErrors: Errors = {};

    if (!formData.password) {
      tempErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      tempErrors.confirmPassword = "Confirm password is required";
    } else if (formData.password !== formData.confirmPassword) {
      tempErrors.confirmPassword = "Passwords do not match";
    }

    if (!token) {
      tempErrors.submit = "Invalid or missing reset token";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name as keyof Errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsSubmitting(true);

    if (validateForm()) {
      try {
        console.log("Resetting password with:", { token, ...formData });
        // Add your password reset logic here
        // Example: await resetPassword(token, formData.password);
        setErrors({
          submit: "Password reset successfully. Redirecting to login...",
        });
        // Optionally redirect after a delay
        setTimeout(() => (window.location.href = "/login"), 2000);
      } catch (error) {
        setErrors({ submit: "Failed to reset password. Please try again." });
      }
    }
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-8 transform transition-all hover:shadow-2xl">
        {/* Header */}
        <div className="text-center space-y-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Reset Password
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Enter your new password below
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            label="New Password"
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your new password"
            error={errors.password}
          />
          <InputField
            label="Confirm New Password"
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your new password"
            error={errors.confirmPassword}
          />

          {errors.submit && (
            <div className="text-center bg-red-50 border border-red-200 rounded-lg p-2">
              <span
                className={`text-sm font-medium ${
                  errors.submit.includes("successfully")
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {errors.submit}
              </span>
            </div>
          )}

          <SubmitButton
            isSubmitting={isSubmitting}
            label="Reset Password"
            loadingLabel="Resetting..."
          />
        </form>

        <FormFooter text="Back to" linkText="Sign in" linkHref="/login" />
      </div>
    </div>
  );
}
