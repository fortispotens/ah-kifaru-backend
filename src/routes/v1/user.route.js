import { Router } from 'express';
import { userExist, isSelf } from '../../middleware/users.middleware';
import UserController from '../../controllers/user.controller';
import validationMiddleware from '../../middleware/validation.middleware';
import authMiddleware from '../../middleware/auth.middleware';
import paginationValidations from '../../middleware/pagination.validation';

const router = Router();
const validateRequest = validationMiddleware();

router.post('/signup', validateRequest, UserController.createAccount);

router.post('/login', validateRequest, UserController.loginUser);

router.patch(
  '/verify/:token',
  validateRequest,
  authMiddleware,
  UserController.verifyUser
);

router.get(
  '/users',
  validateRequest,
  paginationValidations,
  UserController.listUsers
);

router.patch(
  '/unfollow',
  authMiddleware,
  validateRequest,
  isSelf,
  userExist,
  UserController.unfollowUser
);

router.patch(
  '/follow',
  authMiddleware,
  validateRequest,
  isSelf,
  userExist,
  UserController.followUser
);

router.get(
  '/followers',
  authMiddleware,
  paginationValidations,
  UserController.getFollowers
);

router.get(
  '/following',
  authMiddleware,
  paginationValidations,
  UserController.getFollowings
);

export default router;