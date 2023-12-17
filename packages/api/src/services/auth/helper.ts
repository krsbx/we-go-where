import RequestError from '@/errors/RequestError';
import { type User } from '@/models/User';
import { compareText } from '@/utils/hashing';

export async function compareUserPassword(
  user: User,
  body: { password: string }
) {
  const isMatch = await compareText({
    original: user.password,
    text: body.password,
  });

  if (isMatch) return;

  throw new RequestError({
    message: 'Unauthorized',
    statusCode: 401,
    errors: null,
  });
}
