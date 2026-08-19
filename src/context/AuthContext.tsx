import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Admin = { email: string };
type AuthContextValue = {
  admin: Admin | null;
  isAdmin: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<string | null>;
  logout: () => Promise<void>;
};
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

async function readError(response: Response) {
  const data = await response.json().catch(() => ({}));
  return data.error || "Something went wrong. Please try again.";
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetch("/api/auth/me", { credentials: "include" })
      .then(async (response) => { if (response.ok) setAdmin((await response.json()).admin); })
      .finally(() => setIsLoading(false));
  }, []);
  const login = async (email: string, password: string) => {
    try {
      const response = await fetch("/api/auth/login", { method: "POST", credentials: "include", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) });
      if (!response.ok) return readError(response);
      const data = await response.json();
      setAdmin(data.admin);
      return null;
    } catch { return "The server is unavailable. Start the API server and try again."; }
  };
  const logout = async () => { await fetch("/api/auth/logout", { method: "POST", credentials: "include" }); setAdmin(null); };
  return <AuthContext.Provider value={{ admin, isAdmin: Boolean(admin), isLoading, login, logout }}>{children}</AuthContext.Provider>;
}
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
