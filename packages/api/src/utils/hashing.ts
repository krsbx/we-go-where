import env from '@/utils/env';
import bcrypt from 'bcrypt';

export async function hashText(text: string, round = env.SALT_ROUND) {
  const salt = await bcrypt.genSalt(round);

  return bcrypt.hash(text, salt);
}

export async function compareText({
  original,
  text,
}: {
  text: string;
  original: string;
}) {
  const result = await bcrypt.compare(text, original);

  return result;
}
