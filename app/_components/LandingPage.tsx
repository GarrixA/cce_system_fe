/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "react-hook-form";
import { isAdmin, isAGENCY } from "@/utils/config/isValidRole";
import Cookies from "js-cookie";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { usePostCompliantMutation } from "@/store/actions/compliants";
import LogoutModal from "../dashboard/_components/common/LogoutModal";

type Inputs = {
  name: string;
  description: string;
  email: string;
  phone_number?: string;
  images: FileList;
  categoryId: string;
};

export default function LandingPage() {
  const [openLogoutModal, setOpenLogoutModal] = useState(false);
  const [token, setToken] = useState<string | undefined>(undefined);

  const toggleLogoutModal = () => setOpenLogoutModal(!openLogoutModal);

  useEffect(() => {
    const storedToken = Cookies.get("access_token");
    setToken(storedToken);
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const [postCompliant, { isLoading }] = usePostCompliantMutation();

  const onSubmit = async (data: Inputs) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("email", data.email);
    if (data.phone_number) formData.append("phone_number", data.phone_number);
    formData.append("categoryId", data.categoryId);

    Array.from(data.images).forEach((file) => {
      formData.append("images", file);
    });

    try {
      await postCompliant(formData).unwrap();
      toast.success("Compliant submitted successfully!");
      reset();
    } catch (err: any) {
      console.error("Submission error:", err);
      toast.error("Failed to submit compliant.");
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-8 space-y-6">
      <h1 className="text-4xl font-semibold text-gray-800">Welcome to CCE</h1>
      <p className="text-xl text-gray-600">
        The most efficient CCE system at your fingertips. feel free to add your
        compliant
      </p>

      <div className="flex justify-center relative w-full">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-[50%] bg-white p-6 rounded-lg shadow space-y-4"
        >
          {/* Name */}
          <div>
            <label className="block font-medium">Name *</label>
            <input
              {...register("name", { required: "Name is required" })}
              className="w-full border p-2 rounded"
            />
            {errors.name && (
              <p className="text-red-600 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium">Description *</label>
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              className="w-full border p-2 rounded"
            />
            {errors.description && (
              <p className="text-red-600 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block font-medium">Email *</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full border p-2 rounded"
            />
            {errors.email && (
              <p className="text-red-600 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block font-medium">Phone Number</label>
            <input
              {...register("phone_number")}
              className="w-full border p-2 rounded"
            />
          </div>

          {/* Images */}
          <div>
            <label className="block font-medium">Add screen shot</label>
            <input
              type="file"
              multiple
              {...register("images", { required: "Images are required" })}
              className="w-full border p-2 rounded"
            />
            {errors.images && (
              <p className="text-red-600 text-sm">{errors.images.message}</p>
            )}
          </div>

          {/* Category ID */}
          <div>
            <label className="block font-medium">Category ID *</label>
            <input
              {...register("categoryId", {
                required: "Category ID is required",
              })}
              className="w-full border p-2 rounded"
            />
            {errors.categoryId && (
              <p className="text-red-600 text-sm">
                {errors.categoryId.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </form>
        <div className="flex space-x-4 absolute right-20">
          {(isAGENCY() || isAdmin()) && (
            <Link href="/dashboard">
              <button className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition">
                Get Started
              </button>
            </Link>
          )}

          {token ? (
            <button
              onClick={toggleLogoutModal}
              className="px-6 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition"
            >
              Logout
            </button>
          ) : (
            <Link href="/login">
              <button className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition">
                Login
              </button>
            </Link>
          )}

          {openLogoutModal && <LogoutModal toggleLogout={toggleLogoutModal} />}
        </div>
      </div>
    </main>
  );
}
