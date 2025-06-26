import { useState } from "react";

export interface AuthState {
  isAuthenticated: boolean;
  accessToken: string;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>(() => {
    const token = localStorage.getItem("authToken");
    return {
      isAuthenticated: !!token,
      accessToken: token ?? "",
    };
  });

  const login = (token: string) => {
    const newState = {
      isAuthenticated: true,
      accessToken: token,
    };
    localStorage.setItem("authToken", token);
    setAuthState(newState);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setAuthState({
      isAuthenticated: false,
      accessToken: "",
    });
  };

  return {
    ...authState,
    login,
    logout,
  };
};
