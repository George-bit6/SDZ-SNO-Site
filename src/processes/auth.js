import { authService } from "../services/authService";

// Legacy compatibility - these functions now use the new service
export async function getUserId() {
  return await authService.getUserId();
}

export async function submit(email, password) {
  const result = await authService.signIn(email, password);
  return result.success;
}

