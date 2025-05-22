/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { useVerify2FAMutation } from "@/store/actions/auth";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import Router from "next/router";

type FormValues = {
  otp: string;
};

export default function User2FAPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const [verify2FA, { isLoading }] = useVerify2FAMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    try {
      const me = await verify2FA({ token, otp: data.otp }).unwrap();
      toast.success("2FA verified successfully!");
      Cookies.set("token", me.data);
      Router.push("/dashboard");
      console.log("first", me);
    } catch (err: any) {
      toast.error(err?.data?.message || "Invalid OTP or token.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">User 2FA Verification</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-xs flex flex-col gap-4"
      >
        <input
          type="text"
          placeholder="Enter OTP"
          {...register("otp", { required: "OTP is required" })}
          className="border rounded px-3 py-2"
        />
        {errors.otp && (
          <span className="text-red-500 text-xs">{errors.otp.message}</span>
        )}
        <button
          type="submit"
          className="bg-blue-600 text-white rounded px-4 py-2"
          disabled={isLoading}
        >
          {isLoading ? "Verifying..." : "Verify"}
        </button>
      </form>
      <p className="mt-4 text-xs text-gray-400">
        Token: <span className="font-mono break-all">{token}</span>
      </p>
    </div>
  );
}
