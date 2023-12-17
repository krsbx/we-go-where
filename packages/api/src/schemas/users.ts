import _ from 'lodash';
import { z } from 'zod';

export const createSchema = z.object({
  avatar: z.string().url().nullable().default(null).or(z.literal('')),
  username: z.string().toLowerCase().min(5),
  email: z.string().email().toLowerCase(),
  password: z.string().min(5),
});

export const updateSchema = createSchema.omit({ password: true }).partial();

export const signInSchema = z
  .object({
    email: z.string().email().nullable().optional(),
    username: z.string().min(5).nullable().optional(),
    password: z.string().min(5),
  })
  .superRefine((data, ctx) => {
    if (!_.isEmpty(data.email) || !_.isEmpty(data.username)) return;

    ctx.addIssue({
      code: 'custom',
      message: 'Missing email or username',
      path: ['email', 'username'],
    });
  });

export const changePasswordSchema = z
  .object({
    oldPassword: z.string().min(5),
    newPassword: z.string().min(5),
    confirmPassword: z.string().min(5),
  })
  .superRefine((data, ctx) => {
    if (data.newPassword !== data.confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        message: 'Passwords do not match',
        path: ['confirmPassword'],
      });
    }
  });
