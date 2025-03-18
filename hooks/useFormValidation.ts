import { useState } from "react";

interface ValidationRules {
  [key: string]: (value: string, formData?: Record<string, string>) => string;
}

const useFormValidation = (
  initialState: Record<string, string>,
  validationRules: ValidationRules
) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = (
    name: string,
    value: string,
    formData?: Record<string, string>
  ) => {
    const rule = validationRules[name];
    if (rule) {
      const error = rule(value, formData);
      setErrors((prev) => ({
        ...prev,
        [name]: error || "", // Ensuring a string type
      }));
    }
  };

  const validateForm = (formData: Record<string, string>): boolean => {
    const tempErrors: Record<string, string> = {};
    Object.keys(formData).forEach((key) => {
      const error = validationRules[key](formData[key], formData);
      if (error) tempErrors[key] = error;
    });

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  return { errors, setErrors, validateField, validateForm };
};

export default useFormValidation;
