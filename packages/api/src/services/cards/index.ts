import Omise from '@/instances/Omise';
import CardModel, { type Card } from '@/models/Card';
import { AuthedUser } from '@/models/User';
import { chargeSchema, createSchema } from '@/schemas/cards';
import { FilterQuery, QueryOptions } from 'mongoose';
import { validateCardEntity, validateUserCardAccess } from './helper';

export async function createCard(payload: unknown, authedUser: AuthedUser) {
  const body = createSchema.parse(payload);
  const customer = await Omise.customers.create({
    email: authedUser.email,
    metadata: {
      cardHolder: body.cardHolder,
      userId: authedUser._id,
    },
    card: body.cardToken,
  });

  const card = await CardModel.create({
    cardHolder: body.cardHolder,
    cardToken: body.cardToken,
    cardType: body.cardType,
    expiryDate: body.expiryDate,
    lastFour: body.lastFour,
    customerId: customer.id,
    userId: authedUser._id,
  });

  return card;
}

export async function getCreditCards(
  filter: FilterQuery<Card>,
  options: QueryOptions<Card> = {}
) {
  const cards = await CardModel.find(filter, null, options);
  const total = await CardModel.countDocuments(filter);

  return {
    cards,
    total,
  };
}

export async function getCardByCardId(cardId: string, authedUser: AuthedUser) {
  const card = await CardModel.findById(cardId);

  validateCardEntity(card);
  validateUserCardAccess(card, authedUser);

  return card;
}

export async function deleteCard(card: Card | null, authedUser: AuthedUser) {
  validateCardEntity(card);
  validateUserCardAccess(card, authedUser);

  await Omise.customers.destroy(card.customerId);
  await card.deleteOne();
}

export async function chargeCard(
  payload: unknown,
  card: Card | null,
  authedUser: AuthedUser
) {
  validateCardEntity(card);
  validateUserCardAccess(card, authedUser);

  const body = chargeSchema.parse(payload);

  await Omise.charges.create({
    amount: body.amount,
    currency: body.currency,
    customer: card.customerId,
    card: card.cardToken,
  });
}
