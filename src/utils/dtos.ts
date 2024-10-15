// Register
export interface RegisterUserDTO {
    last_name: string;
    first_name: string;
    email: string;
    password: string;
}

// Login
export interface LoginUserDTO {
    email: string;
    password: string;
}