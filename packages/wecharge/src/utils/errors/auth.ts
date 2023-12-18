import { AxiosError } from 'axios';
import { FormikHelpers } from 'formik';
import { reduce, set, startCase } from 'lodash-es';
import { ZodError } from 'zod';
import { SignInPayload, SignUpSchema, signInSchema } from '../../schemas/auth';

export const handleSignUpError = (
  err: AxiosError,
  formikHelpers: FormikHelpers<SignUpSchema>
) => {
  const statusCode = err.response?.status ?? 500;
  const response = err.response?.data ?? {};

  switch (statusCode) {
    case 400: {
      const { errors } = response as ZodError<SignUpSchema>;
      const error = errors.reduce((prev, curr) => {
        set(prev, curr.path, curr.message);

        return prev;
      }, {});

      formikHelpers.setErrors(error);
      break;
    }

    case 409: {
      const { errors } = response as { errors: { path: string }[] };

      const error = errors.reduce((prev, { path }) => {
        set(prev, path, `${startCase(path)} already in use`);

        return prev;
      }, {});

      formikHelpers.setErrors(error);
      break;
    }

    default:
      break;
  }
};

export const handleSignInPayload = (
  values: SignInPayload,
  formikHelpers: FormikHelpers<SignInPayload>
) => {
  const payload = signInSchema.safeParse(values);

  if (payload.success) {
    return payload.data;
  }

  const flatten = payload.error.flatten();
  const errors = reduce(
    flatten.fieldErrors,
    (prev, curr, key) => {
      Object.assign(prev, {
        [key]: curr?.[0] ?? '',
      });

      return prev;
    },
    {}
  );

  formikHelpers.setErrors(errors);
};

export const handleSignInError = (
  err: AxiosError,
  formikHelpers: FormikHelpers<SignInPayload>
) => {
  const statusCode = err.response?.status ?? 500;

  switch (statusCode) {
    case 401:
      formikHelpers.setErrors({
        identifier: 'Invalid e-mail/username',
        password: 'Invalid password',
      });
      break;

    case 404:
      formikHelpers.setErrors({
        identifier: 'User not found',
        password: '',
      });
      break;

    default:
      break;
  }
};
