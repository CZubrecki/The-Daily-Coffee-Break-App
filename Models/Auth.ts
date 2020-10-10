export interface AuthResponse {
    user: User;
}

interface User {
    email: string;
    id: string;
    token: string;
}