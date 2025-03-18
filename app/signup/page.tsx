"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import InputField from "@/components/InputField";
import DatePicker from "@/components/DatePicker";
import SubmitButton from "@/components/SubmitButton";
import FormFooter from "@/components/FormFooter";
import useAxios from "@/hooks/useAxios";
import { USER_REGISTER_URL } from "@/backend/urls";
import toast, { Toaster } from "react-hot-toast";
import useFormValidation from "@/hooks/useFormValidation";
import { validationRules } from "@/utils/formValidationRules";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [formData, setFormData] = useState<Record<string, string>>({
    username: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    password: "",
    confirmPassword: "",
  });
  
  const { errors, setErrors, validateField, validateForm } = useFormValidation(
    formData,
    validationRules
  );
  const navigate = useRouter();
  const { loading, fetchData } = useAxios(USER_REGISTER_URL, "POST");

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "phone" ? value.replace(/\D/g, "") : value,
    }));
    validateField(name, value, { ...formData, [name]: value });
  };

  const handleDateChange = (date: string): void => {
    setFormData((prev) => ({
      ...prev,
      dateOfBirth: date,
    }));
    validateField("dateOfBirth", date);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!validateForm(formData)) return;

    try {
      const { data, error } = await fetchData(formData);

      if (error) {
        toast.error(error?.message, {
          position: "top-right",
        });
        return;
      }
      navigate.push("/login");
      console.log(data);
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err?.message, {
          position: "top-right",
        });
      }
      console.log(err);
      setErrors((prev) => ({
        ...prev,
        submit: "Signup failed. Please try again.",
      }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 lg:p-8">
      <Toaster />
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-8 transform transition-all hover:shadow-2xl">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Create Account
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Join us by filling in your details
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            label="Username"
            id="username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
            error={errors.username}
          />
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
          <InputField
            label="Phone Number"
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            error={errors.phone}
            maxLength={10}
          />
          <DatePicker
            value={formData.dateOfBirth}
            onChange={handleDateChange}
            error={errors.dateOfBirth}
          />
          <InputField
            label="Password"
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            error={errors.password}
          />
          <InputField
            label="Confirm Password"
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            error={errors.confirmPassword}
          />

          {errors.submit && (
            <div className="text-center bg-red-50 border border-red-200 rounded-lg p-2">
              <span className="text-sm text-red-600 font-medium">
                {errors.submit}
              </span>
            </div>
          )}

          <SubmitButton
            isSubmitting={loading}
            label="Sign Up"
            loadingLabel="Signing up..."
          />
        </form>

        <FormFooter
          text="Already have an account?"
          linkText="Sign in"
          linkHref="/login"
        />
      </div>
    </div>
  );
}
