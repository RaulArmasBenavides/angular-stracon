export interface LoginRequest {
  userName: string;   // tu API usa userName, no email
  password: string;
  remember?: boolean;
}

export interface AuthUser {
  id: string;
  userName: string;
  name: string | null;
}

export interface LoginResponse {
  user: AuthUser;
  access_token: string;
  token_type: 'bearer' | string;
}
