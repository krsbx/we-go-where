import { type AuthedUser } from '@/models/User';
import { type CardEnv } from '@/routes/cards';
import {
  chargeCard,
  createCard,
  deleteCard,
  getCardByCardId,
  getCardInfo,
  getCreditCards,
} from '@/services/cards';
import { getPageLimit } from '@/services/setup';
import { type Context, type Next } from 'hono';

export async function prepareCardMw(ctx: Context<CardEnv, '/'>, next: Next) {
  const { page, limit, offset } = getPageLimit(ctx.req.query());

  ctx.set('auth', {
    user: {} as AuthedUser,
  });

  ctx.set('pending', {
    card: null,
    cards: [],
  });

  ctx.set('result', {
    card: null,
    cards: [],
    total: 0,
    offset,
    limit,
    page,
  });

  return next();
}

export async function createCardMw(ctx: Context<CardEnv, '/'>, next: Next) {
  const body = await ctx.req.json();

  const card = await createCard(body, ctx.get('auth').user);

  ctx.set('result', {
    ...ctx.get('result'),
    card,
  });

  return next();
}

export async function getCardsMw(ctx: Context<CardEnv, '/'>, next: Next) {
  const { limit, offset } = ctx.get('result');
  const { cards, total } = await getCreditCards(
    {
      userId: ctx.get('auth').user._id,
    },
    {
      limit,
      skip: offset,
    }
  );

  ctx.set('result', {
    ...ctx.get('result'),
    cards,
    total,
  });

  return next();
}

export async function getCardByCardIdMw(
  ctx: Context<CardEnv, '/:cardId'>,
  next: Next
) {
  const card = await getCardByCardId(
    ctx.req.param('cardId'),
    ctx.get('auth').user
  );

  ctx.set('result', {
    ...ctx.get('result'),
    card,
  });

  return next();
}

export async function deleteCardMw(ctx: Context<CardEnv, '/:cardId'>) {
  await deleteCard(ctx.get('result').card, ctx.get('auth').user);

  return ctx.body(null, 204);
}

export async function chargeCardMw(ctx: Context<CardEnv, '/:cardId'>) {
  const body = await ctx.req.json();

  const charge = await chargeCard(
    body,
    ctx.get('result').card,
    ctx.get('auth').user
  );

  return ctx.json(charge);
}

export async function returnCardMw(ctx: Context<CardEnv, '/:cardId'>) {
  const result = ctx.get('result').card?.toJSON?.();
  const statusCode = result ? 200 : 404;

  return ctx.json(result, statusCode);
}

export async function returnCardInfoMw(ctx: Context<CardEnv, '/:cardId'>) {
  const cardInfo = await getCardInfo(
    ctx.get('result').card,
    ctx.get('auth').user
  );

  return ctx.json(cardInfo);
}

export async function returnCardsMw(ctx: Context<CardEnv, '/'>) {
  const { limit, cards: rows, total, page } = ctx.get('result');

  return ctx.json({
    data: rows,
    page: {
      size: total,
      current: page,
      totalPages: Math.ceil(total / (limit ?? 10)),
    },
  });
}
