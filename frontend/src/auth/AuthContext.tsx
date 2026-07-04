import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import Parse, { currentUser, logIn, signUp, logOut } from '../parse/client';

interface AuthCtx {
  user: Parse.User | null;
  ready: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string, email?: string) => Promise<void>;
  logout: () => Promise<void>;
}

const Ctx = createContext<AuthCtx>(null as unknown as AuthCtx);
export const useAuth = () => useContext(Ctx);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Parse.User | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Parse caches the current user in localStorage; resolve it on boot.
    let cancelled = false;
    (async () => {
      try {
        const u = currentUser();
        // become/validate against server if a session exists, but don't block UI on failure
        if (u) {
          try { await u.fetch(); } catch { /* stale session — keep cached user */ }
        }
        if (!cancelled) setUser(currentUser());
      } finally {
        if (!cancelled) setReady(true);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const login = async (username: string, password: string) => {
    await logIn(username, password);
    setUser(currentUser());
  };
  const register = async (username: string, password: string, email?: string) => {
    await signUp(username, password, email);
    setUser(currentUser());
  };
  const logout = async () => {
    await logOut();
    setUser(null);
  };

  return <Ctx.Provider value={{ user, ready, login, register, logout }}>{children}</Ctx.Provider>;
}
