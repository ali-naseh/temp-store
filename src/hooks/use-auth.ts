"use client";

import { useLoginUser } from "@/api/login";
import { useRegisterUser } from "@/api/register";
import { setToken } from "@/lib/token";
import { useUserStore } from "@/store/user-store";
import { useCallback } from "react";
import { toast } from "sonner";

export function useAuth() {
  const {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    updateUser,
    setLoading,
  } = useUserStore();
  const { mutateAsync: registerUser } = useRegisterUser({
    onSuccess: (data) => {
      toast(`Welcome to ShopHub,${data.username}. You can now start shopping.`);
    },
  });

  const { mutateAsync: loginUser } = useLoginUser();

  const signIn = useCallback(
    async (username: string, password: string) => {
      setLoading(true);
      try {
        await loginUser(
          { username, password },
          {
            onSuccess: (data) => {
              login(
                {
                  address: {
                    geolocation: {
                      lat: "-37.3159",
                      long: "81.1496",
                    },
                    city: "kilcoole",
                    street: "new road",
                    number: 7682,
                    zipcode: "12926-3874",
                  },
                  id: 1,
                  email: "john@gmail.com",
                  username: "johnd",
                  password: "m38rmF$",
                  name: {
                    firstname: "john",
                    lastname: "doe",
                  },
                  phone: "1-570-236-7033",
                },
                data.token
              );
              setToken(data.token);
            },
          }
        );

        return { success: true };
      } catch (error) {
        return { success: false, error: "Invalid credentials" };
      } finally {
        setLoading(false);
      }
    },
    [login, setLoading]
  );

  const signUp = useCallback(
    async (userData: { username: string; email: string; password: string }) => {
      setLoading(true);
      try {
        await registerUser(userData);

        return { success: true };
      } catch (error) {
        return { success: false, error: "Registration failed" };
      } finally {
        setLoading(false);
      }
    },
    [login, setLoading]
  );

  const signOut = useCallback(() => {
    logout();
    setToken(null);
  }, [logout]);

  return {
    user,
    isAuthenticated,
    isLoading,
    signIn,
    signUp,
    signOut,
    updateUser,
  };
}
