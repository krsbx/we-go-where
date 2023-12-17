import { Hono } from 'hono';
import authRoutes from './auth';
import cardRoutes from './cards';
import userRoutes from './users';

const router = new Hono({
  strict: false,
});

// ALL /users
router.route('/', userRoutes);

// ALL /cards
router.route('/', cardRoutes);

// ALL /auth
router.route('/', authRoutes);

export default router;
