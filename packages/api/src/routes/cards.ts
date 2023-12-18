import { authorizeUserMw } from '@/controllers/auth';
import {
  chargeCardMw,
  createCardMw,
  deleteCardMw,
  getCardByCardIdMw,
  getCardsMw,
  prepareCardMw,
  returnCardMw,
  returnCardsMw,
} from '@/controllers/cards';
import { Card } from '@/models/Card';
import { AuthedUser } from '@/models/User';
import { Hono } from 'hono';

export type CardVariables = {
  auth: {
    user: AuthedUser;
  };
  result: {
    [name: string]: unknown;
    card: Card | null;
    cards: (Card | null)[];
    total: number;
    limit: number | undefined;
    page: number;
    offset: number;
  };
  pending: {
    [name: string]: unknown;
    card: Card | null;
    cards: (Card | null)[];
  };
};
export type CardEnv = {
  Variables: CardVariables;
};

const router = new Hono({
  strict: false,
}).basePath('/cards');

router.use('*', prepareCardMw, authorizeUserMw);

// POST /cards
router.post('/', createCardMw, returnCardMw);

// GET /cards
router.get('/', getCardsMw, returnCardsMw);

// GET /cards/:cardId
router.get('/:cardId', getCardByCardIdMw, returnCardMw);

// POST /cards/:cardId/charge
router.post('/:cardId/charge', getCardByCardIdMw, chargeCardMw);

// DELETE /cards/:cardId
router.delete('/:cardId', getCardByCardIdMw, deleteCardMw);

export default router;
