import { authorizeUserMw } from '@/controllers/auth';
import {
  createUserMw,
  deleteUserMw,
  getUserByUserIdMw,
  prepareUserMw,
  returnUserMw,
  updateUserMw,
} from '@/controllers/users';
import { type AuthedUser, type User } from '@/models/User';
import { Hono } from 'hono';

export type UserVariables = {
  auth: {
    user: AuthedUser;
  };
  result: {
    [name: string]: unknown;
    user: User | null;
    users: (User | null)[];
    total: number;
    limit: number | undefined;
    page: number;
    offset: number;
  };
  pending: {
    [name: string]: unknown;
    user: User | null;
    users: (User | null)[];
  };
};
export type UserEnv = {
  Variables: UserVariables;
};

const router = new Hono({
  strict: false,
}).basePath('/users');

router.use('*', prepareUserMw);

// POST /users
router.post('/', createUserMw, returnUserMw);

// Automatically get the user by userId
router.use('/:userId/*', getUserByUserIdMw);

// PATCH /users/:userId
router.patch('/:userId', authorizeUserMw, updateUserMw, returnUserMw);

// GET /users/:userId
router.get('/:userId', returnUserMw);

// DELETE /users/:userId
router.delete('/:userId', authorizeUserMw, deleteUserMw);

export default router;
