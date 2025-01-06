// src/api/auth.ts

import { apiAxios } from ".";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthResponse {
  success: boolean;
  user: User;
  message: string;
}

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const { data } = await apiAxios.post<AuthResponse>('/auth/login', credentials, {
      withCredentials: true 
    });
    return data;
  },

  logout: async (): Promise<void> => {
    await apiAxios.post('/auth/logout', {}, {
      withCredentials: true
    });
  },

  getMe: async (): Promise<User> => {
    const { data } = await apiAxios.get<AuthResponse>('user/me', {
      withCredentials: true
    });
    return data.user;
  },

};