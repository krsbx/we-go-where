import RequestError from '@/errors/RequestError';
import Omise from '@/instances/Omise';
import CardModel, { type Card } from '@/models/Card';
import { AuthedUser } from '@/models/User';
import { chargeSchema, createSchema } from '@/schemas/cards';
import { OMISE_ERROR } from '@/utils/constant/omise';
import { FilterQuery, QueryOptions } from 'mongoose';
import { Charges, Tokens } from 'omise';
import { validateCardEntity, validateUserCardAccess } from './helper';

export async function createCard(payload: unknown, authedUser: AuthedUser) {
  const body = createSchema.parse(payload);
  const [expiryMonth, expiryYear] = body.expiryDate.split('/');

  let result: Card | RequestError | null = null;

  try {
    const { id: cardToken, card: cardInfo } = await Omise.tokens.create({
      card: {
        name: body.cardHolder,
        security_code: body.cvv,
        number: body.number,
        expiration_month: expiryMonth,
        expiration_year: expiryYear,
      } as Tokens.ICard,
    });

    const customer = await Omise.customers.create({
      email: authedUser.email,
      metadata: {
        cardHolder: body.cardHolder,
        userId: authedUser._id,
      },
      card: cardToken,
    });

    result = await CardModel.create({
      cardHolder: body.cardHolder,
      cardType: cardInfo.brand,
      expiryDate: body.expiryDate,
      cardId: cardInfo.id,
      lastFour: cardInfo.last_digits,
      customerId: customer.id,
      userId: authedUser._id,
      cardToken,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    result = new RequestError({
      statusCode: OMISE_ERROR[err?.message as keyof typeof OMISE_ERROR] || 500,
      message: err?.message,
      errors: null,
    });
  }

  if (result instanceof RequestError) {
    throw result;
  }

  return result;
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

  let result: Charges.ICharge | RequestError | null = null;

  try {
    result = await Omise.charges.create({
      amount: body.amount,
      currency: body.currency,
      customer: card.customerId,
      card: card.cardId,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    result = new RequestError({
      statusCode: OMISE_ERROR[err?.message as keyof typeof OMISE_ERROR] || 500,
      message: err?.message,
      errors: null,
    });
  }

  if (result instanceof RequestError) {
    throw result;
  }

  return result;
}

export async function getCardInfo(card: Card | null, authedUser: AuthedUser) {
  validateCardEntity(card);
  validateUserCardAccess(card, authedUser);

  let result: RequestError | Tokens.IToken | null = null;

  try {
    result = await Omise.tokens.retrieve(card.cardToken);

    console.log(await Omise.customers.listCards(card.customerId));

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    result = new RequestError({
      statusCode: OMISE_ERROR[err?.message as keyof typeof OMISE_ERROR] || 500,
      message: err?.message,
      errors: null,
    });
  }

  if (result instanceof RequestError) {
    throw result;
  }

  return result;
}
