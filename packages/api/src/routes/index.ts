import { Hono } from 'hono';
import cardRoutes from './cards';
import userRoutes from './users';

const router = new Hono({
  strict: false,
});

// ALL /users
router.route('/', userRoutes);

// ALL /cards
router.route('/', cardRoutes);

export default router;
