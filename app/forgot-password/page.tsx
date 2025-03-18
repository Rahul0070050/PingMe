"use client";

import FormFooter from "@/components/FormFooter";
import InputField from "@/components/InputField";
import SubmitButton from "@/components/SubmitButton";
import { useState, FormEvent, ChangeEvent } from "react";

interface FormData {
  email: string;
}

interface Errors {
  email?: string;
  submit?: string;
}

export default function ForgotPasswordPage() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const validateForm = (): boolean => {
    const tempErrors: Errors = {};

    if (!formData.email) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email is invalid";
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
        console.log("Password reset requested for:", formData.email);
        // Add your password reset logic here
        // Example: await sendResetEmail(formData.email);
        // You might want to show a success message instead of an error
        setErrors({
          submit: "If an account exists, a reset link has been sent.",
        });
      } catch (error) {
        if (error instanceof Error) {
          setErrors({
            submit: error.message,
          });
          return;
        }
        console.log(error);
        setErrors({
          submit: "Failed to send reset email. Please try again." + error,
        });
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
              Forgot Password
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Enter your email to reset your password
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            label="Email"
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            error={errors.email}
          />

          {errors.submit && (
            <div className="text-center bg-red-50 border border-red-200 rounded-lg p-2">
              <span className="text-sm text-red-600 font-medium">
                {errors.submit}
              </span>
            </div>
          )}

          <SubmitButton
            isSubmitting={isSubmitting}
            label="Reset Password"
            loadingLabel="Sending..."
          />
        </form>

        <FormFooter
          text="Remember your password?"
          linkText="Sign in"
          linkHref="/login"
        />
      </div>
    </div>
  );
}
