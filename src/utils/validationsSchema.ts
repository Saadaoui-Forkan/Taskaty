import { z } from "zod";

export const registerSchema = z.object({
  first_name: z
    .string({
      required_error: "Username is required",
    })
    .min(2, {
      message:
        "The username must contain at least 2 characters and a maximum of 100 characters.",
    })
    .max(100, {
      message:
        "The username must contain at least 2 characters and a maximum of 100 characters.",
    }),

  last_name: z
    .string({
      required_error: "Username is required",
    })
    .min(2, {
      message:
        "The username must contain at least 2 characters and a maximum of 100 characters.",
    })
    .max(100, {
      message:
        "The username must contain at least 2 characters and a maximum of 100 characters.",
    }),

  email: z
    .string({
      required_error: "Email is required",
    })
    .email(),

  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, {
      message: "The Password must contain at least 6 characters.",
    }),
});

// Login
export const loginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email(),

  password: z.string({
    required_error: "Password is required",
  }),
});

// Create Task
export const createTaskSchema = z.object({
  title: z
    .string({
      required_error: "This Field Is Required",
    })
    .min(10, {
      message:
        "This field must contain at least 10 characters and a maximum of 200 characters.",
    })
    .max(200, {
      message:
        "This field must contain at least 10 characters and a maximum of 200 characters.",
    }),

  description: z
    .string({
      required_error: "This Field Is Required",
    })
    .min(20, {
      message: "This field must contain at least 20 characters.",
    }),
});
