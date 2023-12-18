import { AxiosError } from 'axios';
import { FormikHelpers } from 'formik';
import { set, startCase } from 'lodash-es';
import { ZodError } from 'zod';

export const handleCreationError = (
  err: AxiosError,
  // We use any here because FormikHelpers is not typed
  // In fact the type should be an object ( Nonullable<unknown> )
  formikHelpers: FormikHelpers<any>
) => {
  const statusCode = err.response?.status ?? 500;
  const response = err.response?.data ?? {};

  switch (statusCode) {
    case 400: {
      const { errors } = response as ZodError;
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
