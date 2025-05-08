import { createContext } from "react";
import { User } from "firebase/auth";

export type AuthContextType = {
  user: User | null;
  loading: boolean;
};

// Create a context for authentication with default values
export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});
