import Cookies from "js-cookie";
import { decodeToken } from "./decode";

interface DecodedToken {
  role: string;
}

export const isAdmin = (): boolean => {
  const token = Cookies.get("access_token");
  console.log("Token:", token);
  if (!token || token.split(".").length !== 3) return false;

  try {
    const decoded: DecodedToken = decodeToken(token);
    return decoded.role === "ADMIN";
  } catch (error) {
    console.error("Token decode error:", error);
    return false;
  }
};

export const isAGENCY = (): boolean => {
  const token = Cookies.get("access_token");
  console.log("Token:", token);

  if (!token || token.split(".").length !== 3) return false;

  try {
    const decoded: DecodedToken = decodeToken(token);
    return decoded.role === "AGENCY";
  } catch (error) {
    console.error("Token decode error:", error);
    return false;
  }
};
