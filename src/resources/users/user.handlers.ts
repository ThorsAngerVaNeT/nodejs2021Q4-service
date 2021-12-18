import { STATUS_CODES } from 'http';
import { constants as httpConstants } from 'http2';
import { FastifyRequest, FastifyReply } from 'fastify';
import { User } from './user.model';
import usersService from './user.service';

interface userParams {
  userId: string;
}

type UserRequest = FastifyRequest<{
  Body: User;
}>;

type PutUserRequest = FastifyRequest<{
  Body: User;
  Params: userParams;
}>;

/**
 * Handles incoming request to get all users
 * @param _ - incoming request object, not using
 * @param res - response object
 */
const userGet = async (_: FastifyRequest, res: FastifyReply): Promise<void> => {
  const users = await usersService.getAll();
  res.send(users.map(User.toResponse));
};

/**
 * Handles incoming request to get user by id
 * @param req - incoming request object
 * @param res - response object
 */
const userGetById = async (
  req: FastifyRequest<{ Params: userParams }>,
  res: FastifyReply
): Promise<void> => {
  const { userId } = req.params;
  const user = await usersService.getById(userId);
  if (user) {
    res.send(user);
  } else {
    res.code(httpConstants.HTTP_STATUS_NOT_FOUND);
    res.send(STATUS_CODES[httpConstants.HTTP_STATUS_NOT_FOUND]);
  }
};

/**
 * Handles incoming request to create new user
 * @param req - incoming request object
 * @param res - response object
 */
const userPost = async (req: UserRequest, res: FastifyReply): Promise<void> => {
  const user = new User(req.body);
  await usersService.create(user);
  res.code(httpConstants.HTTP_STATUS_CREATED);
  res.send(User.toResponse(user));
};

/**
 * Handles incoming request to update user
 * @param req - incoming request object
 * @param res - response object
 */
const userPut = async (
  req: PutUserRequest,
  res: FastifyReply
): Promise<void> => {
  const { userId } = req.params;
  const user = await usersService.update(userId, req.body);
  if (user) {
    res.send(User.toResponse(user));
  } else {
    res.code(httpConstants.HTTP_STATUS_NOT_FOUND);
    res.send(STATUS_CODES[httpConstants.HTTP_STATUS_NOT_FOUND]);
  }
};

/**
 * Handles incoming request to delete user
 * @param req - incoming request object
 * @param res - response object
 */
const userDelete = async (
  req: FastifyRequest<{ Params: userParams }>,
  res: FastifyReply
): Promise<void> => {
  const { userId } = req.params;
  const result = await usersService.remove(userId);
  if (result) {
    res.code(httpConstants.HTTP_STATUS_NO_CONTENT);
    res.send();
  } else {
    res.code(httpConstants.HTTP_STATUS_NOT_FOUND);
    res.send(STATUS_CODES[httpConstants.HTTP_STATUS_NOT_FOUND]);
  }
};

export default { userGet, userGetById, userPost, userPut, userDelete };
