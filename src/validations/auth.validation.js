import { z } from 'zod';

export const signupSchema = z.object({
  name: z
    .string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be a string',
    })
    .min(2, 'Name must be at least 2 characters long')
    .max(100, 'Name must be at most 100 characters long')
    .trim(),
  email: z
    .email('Invalid email address')
    .max(255, 'Email must be at most 255 characters long')
    .toLowerCase()
    .trim(),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .max(128, 'Password must be at most 128 characters long'),
  role: z
    .enum(['user', 'admin'], 'Role must be either user or admin')
    .default('user'),
});

export const signinSchema = z.object({
  email: z
    .email('Invalid email address')
    .max(255, 'Email must be at most 255 characters long')
    .toLowerCase()
    .trim(),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .max(128, 'Password must be at most 128 characters long'),
});
