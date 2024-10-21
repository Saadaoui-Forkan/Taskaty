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

// Create Task
export interface CreateTaskDTO {
    title: string,
    description: string,
    from: Date,
    to: Date,
}

//  Update Task
export interface UpdateTaskDTO {
    title?: string,
    description?: string,
    from?: Date,
    to?: Date,
}