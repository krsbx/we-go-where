import RequestError from '@/errors/RequestError';
import UserModel, { AuthedUser, type User } from '@/models/User';

export async function checkUserExists({
  email,
  username,
  userId,
}: Partial<{
  email: string;
  username: string;
  userId: string;
}>) {
  const exists = await UserModel.exists({
    $or: [{ email }, { username }],
    _id: { $ne: userId },
  });

  if (!exists) return;

  throw new RequestError({
    statusCode: 409,
    message: 'User already exists',
    errors: {
      email: 'Email already exists',
      username: 'Username already exists',
    },
  });
}

export function validateUserEntity(user: User | null): asserts user is User {
  if (user) return;

  throw new RequestError({
    message: 'User not found',
    statusCode: 404,
    errors: null,
  });
}

export function validateUserAccess(user: User, accesor: AuthedUser) {
  if (user.id === accesor._id) return;

  throw new RequestError({
    message: 'Forbidden',
    statusCode: 403,
    errors: null,
  });
}
