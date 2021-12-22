import { STATUS_CODES } from 'http';
import { constants as httpConstants } from 'http2';
import { FastifyRequest, FastifyReply } from 'fastify';
import { Board } from './board.model';
import boardsService from './board.service';

interface boardParams {
  boardId: string;
}

type BoardRequest = FastifyRequest<{
  Body: Omit<Board, 'id'>;
}>;

type PutBoardRequest = FastifyRequest<{
  Body: Board;
  Params: boardParams;
}>;

/**
 * Handles incoming request to get all boards
 * @param _ - incoming request object, not using
 * @param res - response object
 */
const boardGet = async (
  _: FastifyRequest,
  res: FastifyReply
): Promise<void> => {
  const boards = await boardsService.getAll();
  res.send(boards);
};

/**
 * Handles incoming request to get board by id
 * @param req - incoming request object
 * @param res - response object
 */
const boardGetById = async (
  req: FastifyRequest<{ Params: boardParams }>,
  res: FastifyReply
): Promise<void> => {
  const { boardId } = req.params;
  const board = await boardsService.getById(boardId);
  if (board) {
    res.send(board);
  } else {
    res.code(httpConstants.HTTP_STATUS_NOT_FOUND);
    res.send(STATUS_CODES[httpConstants.HTTP_STATUS_NOT_FOUND]);
  }
};

/**
 * Handles incoming request to create new board
 * @param req - incoming request object
 * @param res - response object
 */
const boardPost = async (
  req: BoardRequest,
  res: FastifyReply
): Promise<void> => {
  const board = new Board(req.body);
  await boardsService.create(board);
  res.code(httpConstants.HTTP_STATUS_CREATED);
  res.send(board);
};

/**
 * Handles incoming request to update board
 * @param req - incoming request object
 * @param res - response object
 */
const boardPut = async (
  req: PutBoardRequest,
  res: FastifyReply
): Promise<void> => {
  const { boardId } = req.params;
  const board = await boardsService.update(boardId, req.body);
  if (board) {
    res.send(board);
  } else {
    res.code(httpConstants.HTTP_STATUS_NOT_FOUND);
    res.send(STATUS_CODES[httpConstants.HTTP_STATUS_NOT_FOUND]);
  }
};

/**
 * Handles incoming request to delete board
 * @param req - incoming request object
 * @param res - response object
 */
const boardDelete = async (
  req: FastifyRequest<{ Params: boardParams }>,
  res: FastifyReply
): Promise<void> => {
  const { boardId } = req.params;
  const result = await boardsService.remove(boardId);
  if (result) {
    res.code(httpConstants.HTTP_STATUS_NO_CONTENT);
    res.send();
  } else {
    res.code(httpConstants.HTTP_STATUS_NOT_FOUND);
    res.send(STATUS_CODES[httpConstants.HTTP_STATUS_NOT_FOUND]);
  }
};

export default { boardGet, boardGetById, boardPost, boardPut, boardDelete };
