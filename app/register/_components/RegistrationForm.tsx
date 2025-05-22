/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRegisterMutation } from "@/store/actions/auth";
import { registerSchema } from "@/validations/formValidations";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
interface IFormInput {
  firstName: string;
  lastName: string;
  email: string;
  phone_number: string;
  password: string;
  confirmPassword: string;
}

const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: zodResolver(registerSchema),
  });

  const router = useRouter();
  const [registerUser, { isLoading }] = useRegisterMutation();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const response = await registerUser(data).unwrap();
      toast.success(response?.message);
      router.push("/login");
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <div className="w-1/2 mx-auto p-8 bg-white rounded-lg _shadow mt-8">
      <h2 className="text-4xl font-semibold text-center text-gray-800 mb-6">
        Register
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        <div>
          <label
            className="block text-lg font-medium text-gray-700"
            htmlFor="firstName"
          >
            First Name
          </label>
          <input
            id="firstName"
            type="text"
            {...register("firstName")}
            className="w-full mt-2 p-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          {errors.firstName && (
            <span className="text-red-500 text-sm">
              {errors.firstName.message}
            </span>
          )}
        </div>

        <div>
          <label
            className="block text-lg font-medium text-gray-700"
            htmlFor="lastName"
          >
            Last Name
          </label>
          <input
            id="lastName"
            type="text"
            {...register("lastName")}
            className="w-full mt-2 p-2 border border-gray-300 rounded-sm shadow-s focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          {errors.lastName && (
            <span className="text-red-500 text-sm">
              {errors.lastName.message}
            </span>
          )}
        </div>

        <div>
          <label
            className="block text-lg font-medium text-gray-700"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            className="w-full mt-2 p-2 border border-gray-300 rounded-sm shadow-s focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </div>

        <div>
          <label
            className="block text-lg font-medium text-gray-700"
            htmlFor="phone_number"
          >
            Phone Number
          </label>
          <input
            id="phone_number"
            type="text"
            {...register("phone_number")}
            className="w-full mt-2 p-2 border border-gray-300 rounded-sm shadow-s focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          {errors.phone_number && (
            <span className="text-red-500 text-sm">
              {errors.phone_number.message}
            </span>
          )}
        </div>

        <div>
          <label
            className="block text-lg font-medium text-gray-700"
            htmlFor="password"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            {...register("password")}
            className="w-full mt-2 p-2 border border-gray-300 rounded-sm shadow-s focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message}
            </span>
          )}
        </div>

        <div>
          <label
            className="block text-lg font-medium text-gray-700"
            htmlFor="confirmPassword"
          >
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            {...register("confirmPassword")}
            className="w-full mt-2 p-2 border border-gray-300 rounded-sm shadow-s focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          {errors.confirmPassword && (
            <span className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          className="col-span-2 w-full py-3 bg-blue-600 text-white font-semibold rounded-sm shadow-l hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isLoading}
        >
          {isLoading ? "Registering..." : "Register"}
        </button>
        <div className="flex items-center justify-end gap-1 col-span-2">
          <span>Already have an account</span>{" "}
          <Link
            href={"/login"}
            className="text-blue-700 cursor-pointer font-bold"
          >
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
