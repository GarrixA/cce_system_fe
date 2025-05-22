import { toast } from "react-toastify";

export function handleApiError(status?: number) {
  const messages: Record<number, string> = {
    400: "Bad request, please check your input",
    401: "Invalid email or password",
    403: "Access denied",
    404: "User not found",
    408: "Request timeout, please try again",
    422: "Unprocessable entity, please check your input",
    429: "Too many requests, please try again later",
    500: "Server error, please try again later",
  };

  if (status && messages[status]) {
    toast.error(messages[status]);
  } else {
    toast.error("An unexpected error occurred");
  }
}
