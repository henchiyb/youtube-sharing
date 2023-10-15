import { createContext, useContext, useState } from "react";
import { axiosClient } from "../lib/axios";

const authContext = createContext<AuthResponse>({
  user: null,
  login: () => {},
  authenticated: () => Promise.resolve(null),
  logout: () => {},
  loading: true,
});

type User = {
  id: string;
  email: string;
};

type AuthResponse = {
  user: User | null;
  login: (email: string, password: string) => void;
  authenticated: () => Promise<User | null>;
  logout: () => void;
  loading: boolean;
};

export const useAuth = () => {
  return useContext(authContext);
};

export const AuthProvider = ({ children }: any) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useProvideAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const login = async (email: string, password: string) => {
    try {
      const response = await axiosClient.post("/auth/login", {
        user: { email: email, password: password },
      });
      setUser(response.data.user);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await axiosClient.delete("/auth/logout");
      setUser(null);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const authenticated = async () => {
    try {
      const response = await axiosClient.post("/auth/me");
      setUser(response.data.user);
      setLoading(false);
      return Promise.resolve(response.data.user);
    } catch (error) {
      setLoading(false);
      return Promise.resolve(null);
    }
  };
  return { user, login, authenticated, logout, loading };
};
