"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLoginMutation } from "@/store/actions/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookie from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { z } from "zod";
import { handleApiError } from "@/utils/handleApiError";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginForm = z.infer<typeof loginSchema>;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const [login, { isLoading }] = useLoginMutation();
  const router = useRouter();

  const onSubmit = async (data: LoginForm) => {
    try {
      const response = await login(data).unwrap();
      if (response) {
        console.log("response", response);
        const token = response?.data;
        Cookie.set("access_token", token);
        router.push("/");
        toast.success(response?.message);
      }
    } catch (err: any) {
      console.log("Error:", err);
      handleApiError(err?.status);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Login
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("email")}
            />
            {errors?.email && (
              <p className="text-red-600 text-sm mt-1">
                {errors?.email?.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-600 text-sm mt-1">
                {errors?.password?.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-sm hover:bg-blue-700 transition duration-200"
            disabled={isSubmitting || isLoading}
          >
            {isLoading || isSubmitting ? "Logging in..." : "Login"}
          </button>
          <div className="flex items-center justify-end gap-1">
            <span>Don&apos;t have an account</span>{" "}
            <Link
              href={"/register"}
              className="text-blue-700 cursor-pointer font-bold"
            >
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
