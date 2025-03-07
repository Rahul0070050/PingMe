import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setUser, selectUser } from "../store/userSlice";
import { StaticImageData } from "next/image";

export interface UserSettings {
  username: string;
  email: string;
  phone: string;
  bio: string;
  website: string;
  youtubeLink: string;
  twitterLink: string;
  facebookLink: string;
  linkedinLink: string;
  chatNotifications: boolean;
  chatSound: boolean;
  profileImage: File | string | StaticImageData | null;
}

export const useUserSettingsLogic = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const {
    username: initialUsername,
    email: initialEmail,
    avatar,
    phone,
  } = user;

  const [settings, setSettings] = useState<UserSettings>({
    username: initialUsername || "",
    email: initialEmail || "",
    phone: phone || "",
    bio: "",
    website: "",
    youtubeLink: "",
    twitterLink: "",
    facebookLink: "",
    linkedinLink: "",
    chatNotifications: true,
    chatSound: true,
    profileImage: avatar || null,
  });
  const [imagePreview, setImagePreview] = useState<string | null>(
    typeof avatar === "string" ? avatar : null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    return () => {
      if (imagePreview && settings.profileImage instanceof File) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview, settings.profileImage]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!settings.username.trim()) newErrors.username = "Username is required";
    if (!settings.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(settings.email))
      newErrors.email = "Email is invalid";
    if (
      settings.phone &&
      !/^\+?\d{10,15}$/.test(settings.phone.replace(/\D/g, ""))
    )
      newErrors.phone = "Phone must be 10-15 digits";
    if (settings.website && !/^https?:\/\/.*/.test(settings.website))
      newErrors.website = "Website must start with http:// or https://";
    if (
      settings.youtubeLink &&
      !/^https?:\/\/(www\.)?youtube\.com/.test(settings.youtubeLink)
    )
      newErrors.youtubeLink = "Enter a valid YouTube URL";
    if (
      settings.twitterLink &&
      !/^https?:\/\/(www\.)?twitter\.com/.test(settings.twitterLink)
    )
      newErrors.twitterLink = "Enter a valid Twitter URL";
    if (
      settings.facebookLink &&
      !/^https?:\/\/(www\.)?facebook\.com/.test(settings.facebookLink)
    )
      newErrors.facebookLink = "Enter a valid Facebook URL";
    if (
      settings.linkedinLink &&
      !/^https?:\/\/(www\.)?linkedin\.com/.test(settings.linkedinLink)
    )
      newErrors.linkedinLink = "Enter a valid LinkedIn URL";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked, files } = e.target as HTMLInputElement;
    if (type === "file" && files?.[0]) {
      const file = files[0];
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          profileImage: "Image must be under 5MB",
        }));
        return;
      }
      if (imagePreview && settings.profileImage instanceof File) {
        URL.revokeObjectURL(imagePreview);
      }
      setSettings((prev) => ({ ...prev, profileImage: file }));
      setImagePreview(URL.createObjectURL(file));
      setErrors((prev) => ({ ...prev, profileImage: "" }));
    } else {
      setSettings((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const updatedSettings = { ...settings };
      if (settings.profileImage instanceof File) {
        const formData = new FormData();
        formData.append("profileImage", settings.profileImage);
        updatedSettings.profileImage = URL.createObjectURL(
          settings.profileImage
        ); // Temporary
      }
      dispatch(setUser(updatedSettings));
      console.log("User settings saved:", updatedSettings);
    } catch (error) {
      console.error("Failed to save settings:", error);
      setErrors((prev) => ({ ...prev, submit: "Failed to save settings" }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (imagePreview && settings.profileImage instanceof File) {
      URL.revokeObjectURL(imagePreview);
    }
  };

  return {
    settings,
    imagePreview,
    isSubmitting,
    errors,
    handleChange,
    handleSubmit,
    handleClose,
  };
};
