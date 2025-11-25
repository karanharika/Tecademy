//useAuth.js
import { useAuthContext } from "./AuthProvider";

export function useAuth() {
  return useAuthContext();
}
