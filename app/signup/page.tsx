"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import InputField from "@/components/InputField";
import DatePicker from "@/components/DatePicker";
import SubmitButton from "@/components/SubmitButton";
import FormFooter from "@/components/FormFooter";

interface FormData {
  username: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  password: string;
  confirmPassword: string;
}

interface Errors {
  username?: string;
  email?: string;
  phone?: string;
  dateOfBirth?: string;
  password?: string;
  confirmPassword?: string;
  submit?: string;
}

export default function SignupPage() {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const validateForm = (): boolean => {
    const tempErrors: Errors = {};

    if (!formData.username.trim()) {
      tempErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      tempErrors.username = "Username must be at least 3 characters";
    }

    if (!formData.email) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email is invalid";
    }

    if (!formData.phone) {
      tempErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) {
      tempErrors.phone = "Phone number must be 10 digits";
    }

    if (!formData.dateOfBirth) {
      tempErrors.dateOfBirth = "Date of birth is required";
    } else {
      const dob = new Date(formData.dateOfBirth);
      const today = new Date();
      if (dob >= today) {
        tempErrors.dateOfBirth = "Date of birth must be in the past";
      }
    }

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

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "phone" ? value.replace(/\D/g, "") : value,
    }));
    if (errors[name as keyof Errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleDateChange = (date: string): void => {
    setFormData((prev) => ({
      ...prev,
      dateOfBirth: date,
    }));
    if (errors.dateOfBirth) {
      setErrors((prev) => ({
        ...prev,
        dateOfBirth: undefined,
      }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsSubmitting(true);

    if (validateForm()) {
      try {
        console.log("Form submitted:", formData);
        // Add your signup logic here
        // Example: await signupUser(formData);
      } catch (error) {
        setErrors({ submit: "Signup failed. Please try again." });
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
              Create Account
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Join us by filling in your details
            </p>
          </div>
        </div>

        {/* Form */}
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
            isSubmitting={isSubmitting}
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
