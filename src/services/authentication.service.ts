/* eslint-disable @typescript-eslint/no-explicit-any */
import backendApi from "./api.service";

interface LoginData {
  username: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export const userLogin = async (data: LoginData) => {
  try {
    const response = await backendApi.post(
      "/auth/login",
      { ...data, grant_type: "password" },
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );
    if (response.data.access_token) {
      localStorage.setItem("authToken", response.data.access_token);
    }
    return response;
  } catch (error: any) {
    if (error?.status === 401) {
      throw new Error("Invalid credentials");
    }
    console.error("Login failed:", error);
    throw new Error("Login failed");
  }
};

export const userRegister = async (data: RegisterData) => {
  try {
    const response = await backendApi.post("/auth/register", data, {
      headers: { "Content-Type": "application/json" },
    });
    return response;
  } catch (error) {
    console.error("Registration failed:", error);
    throw new Error("Registration failed");
  }
};
