export interface User {
  createdAt: string;
  email: string;
  name: string;
  updatedAt: string;
  _id: string;
}
export interface SignUpRequest {
  name: string;
  email: string;
  password: string;
}
export interface LoginRequest {
  email: string;
  password: string;
}
