import RequestError from '@/errors/RequestError';
import { Card } from '@/models/Card';
import { AuthedUser } from '@/models/User';

export function validateCardEntity(card: Card | null): asserts card is Card {
  if (card) return;

  throw new RequestError({
    message: 'Card not found',
    statusCode: 404,
    errors: null,
  });
}

export function validateUserCardAccess(card: Card, accesor: AuthedUser) {
  if (card.userId.toString() === accesor._id) return;

  throw new RequestError({
    message: 'Forbidden',
    statusCode: 403,
    errors: null,
  });
}
