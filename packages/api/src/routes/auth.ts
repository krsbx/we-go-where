import {
  authorizeUserMw,
  changePasswordMw,
  prepareAuthMw,
  signInUserMw,
} from '@/controllers/auth';
import { createUserMw, returnUserMw } from '@/controllers/users';
import { AuthedUser, type User } from '@/models/User';
import { Hono } from 'hono';

export type AuthVariables = {
  auth: {
    [name: string]: unknown;
    user: AuthedUser;
  };
  result: {
    [name: string]: unknown;
    user: User | null;
  };
  pending: {
    [name: string]: unknown;
    user: User | null;
  };
};
export type AuthEnv = {
  Variables: AuthVariables;
};

const router = new Hono({
  strict: false,
}).basePath('/auth');

router.use('*', prepareAuthMw);

// POST /auth/signup
router.post('/signup', createUserMw, returnUserMw);

// POST /auth/signin
router.post('/signin', signInUserMw);

// POST /auth/change-password
router.post('/change-password', authorizeUserMw, changePasswordMw);

export default router;
