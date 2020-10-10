export interface AuthResponse {
    user: User;
}

interface User {
    email: string;
    id: string;
    token: string;
}

export interface LoginPayload {
    email: string;
    password: string;
}

export interface SignUpPayload extends LoginPayload {
    confirmPassword: string;
}