import express, { NextFunction, Request, Response } from "express";
import { commentsService } from "../5-services/comments-service";
import { StatusCode } from "../3-models/error-enum";
import { securityMiddleware } from "../4-middleware/security-middleware";
import { CommentModel } from "../3-models/comment-model";

// comments controller:
class CommentsController {
  // Create a router object for listening to HTTP requests:
  public readonly router = express.Router();

  // Register routes once:
  public constructor() {
    this.registerRoutes();
  }

  // Register routes:
  private registerRoutes(): void {
    this.router.get(
      "/users",
      securityMiddleware.verifyLoggedIn,
      this.getAllUsers
    );
    this.router.get(
      "/comments-by-user/:userId(\\d+)",
      securityMiddleware.verifyLoggedIn,
      this.getCommentsByUserId
    );

    this.router.get(
      "/comments-by-song/:songId(\\d+)",
      securityMiddleware.verifyLoggedIn,
      this.getCommentsBySongId
    );

    this.router.post(
      "/comments",
      securityMiddleware.verifyLoggedIn,
      this.addComment
    );

    this.router.delete(
      "/comments/:id(\\d+)",
      securityMiddleware.verifyLoggedIn,
      this.deleteComment
    );
  }

  // GET http://localhost:4000/api/comments-by-user/:userId
  private async getAllUsers(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const users = await commentsService.getAllUsers();
      response.json(users);
    } catch (err: any) {
      next(err);
    }
  }
  // GET http://localhost:4000/api/comments-by-user/:userId
  private async getCommentsByUserId(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = +request.params.userId;
      const comments = await commentsService.getCommentsByUserId(userId);
      response.json(comments);
    } catch (err: any) {
      next(err);
    }
  }

  // GET http://localhost:4000/api/comments-by-user/:userId
  private async getCommentsBySongId(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const songId = +request.params.songId;
      const comments = await commentsService.getCommentsBySongId(songId);
      response.json(comments);
    } catch (err: any) {
      next(err);
    }
  }

  // POST http://localhost:4000/api/comments
  private async addComment(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      request.body.image = request.files?.image;
      const comment = new CommentModel(request.body);
      const addedComment = await commentsService.addComment(comment);
      response.status(StatusCode.Created).json(addedComment);
    } catch (err: any) {
      next(err);
    }
  }

  // DELETE http://localhost:4000/api/comments/:id
  private async deleteComment(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = +request.params.id;
      await commentsService.deleteComment(id);
      response.sendStatus(StatusCode.NoContent);
    } catch (err: any) {
      next(err);
    }
  }
}

const commentsController = new CommentsController();
export const commentsRouter = commentsController.router;
