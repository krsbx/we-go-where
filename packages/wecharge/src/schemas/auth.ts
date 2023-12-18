import { ZodIssueCode, z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';

export const signInSchema = z
  .object({
    identifier: z.string({
      required_error: 'E-mail/Username is required',
    }),
    password: z
      .string({
        required_error: 'Password is required',
      })
      .min(5),
    username: z.string().optional().nullable(),
    email: z.string().optional().nullable(),
  })
  .superRefine((data, ctx) => {
    const isEmail = z.string().email().safeParse(data.identifier).success;

    if (isEmail) {
      data.email = data.identifier;
      return;
    }

    if (data.identifier.length < 5) {
      ctx.addIssue({
        message: 'String must contain at least 5 character(s)',
        code: ZodIssueCode.too_small,
        path: ['identifier'],
        inclusive: true,
        type: 'string',
        minimum: 5,
      });

      return;
    }

    data.username = data.identifier;
  });

export const formikSignInSchema = toFormikValidationSchema(signInSchema);

export type SignInSchema = z.infer<typeof signInSchema>;

export type SignInPayload = Pick<SignInSchema, 'identifier' | 'password'>;

export const signUpSchema = z.object({
  avatar: z.string().url().nullable().default(null).or(z.literal('')),
  username: z.string().toLowerCase().min(5),
  email: z.string().email().toLowerCase(),
  password: z.string().min(5),
});

export const formikSignUpSchema = toFormikValidationSchema(signUpSchema);

export type SignUpSchema = z.infer<typeof signUpSchema>;
