export const validationRules = {
  username: (value: string) => {
    if (!value.trim()) return "Username is required";
    if (value.length < 3) return "Username must be at least 3 characters";
    return "";
  },
  email: (value: string) => {
    if (!value) return "Email is required";
    if (!/\S+@\S+\.\S+/.test(value)) return "Email is invalid";
    return "";
  },
  phone: (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    if (!cleaned) return "Phone number is required";
    if (!/^\d{10}$/.test(cleaned)) return "Phone number must be 10 digits";
    return "";
  },
  dateOfBirth: (value: string) => {
    if (!value) return "Date of birth is required";
    const dob = new Date(value);
    const today = new Date();
    if (dob >= today) return "Date of birth must be in the past";
    return "";
  },
  password: (value: string) => {
    if (!value) return "Password is required";
    if (value.length < 6) return "Password must be at least 6 characters";
    return "";
  },
  confirmPassword: (value: string, formData?: Record<string, string>) => {
    if (!value) return "Confirm password is required";
    if (formData && value !== formData.password)
      return "Passwords do not match";
    return "";
  },
};
