import express, { NextFunction, Request, Response } from "express";
import { membersService } from "../5-services/members-service";
import { MemberModel } from "../3-models/member-model";
import { StatusCode } from "../3-models/error-enum";
import { fileSaver } from "uploaded-file-saver";

// members controller:
class MembersController {
  // Create a router object for listening to HTTP requests:
  public readonly router = express.Router();

  // Register routes once:
  public constructor() {
    this.registerRoutes();
  }

  // Register routes:
  private registerRoutes(): void {
    this.router.get("/members", this.getAllMembers);
    this.router.get("/members/:id(\\d+)", this.getOneMember);
    this.router.post("/members", this.addMember);
    this.router.delete("/members/:id(\\d+)", this.deleteMember);
    this.router.get("/members/images/:imageName", this.getImageFile);
  }

  // GET http://localhost:4000/api/members
  private async getAllMembers(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const members = await membersService.getAllMembers();
      response.json(members);
    } catch (err: any) {
      next(err);
    }
  }

  // GET http://localhost:4000/api/members/:id
  private async getOneMember(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = +request.params.id;
      const member = await membersService.getOneMember(id);
      response.json(member);
    } catch (err: any) {
      next(err);
    }
  }

  // POST http://localhost:4000/api/members
  private async addMember(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      request.body.image = request.files?.image;
      const member = new MemberModel(request.body);
      const addedMember = await membersService.addMember(member);
      response.status(StatusCode.Created).json(addedMember);
    } catch (err: any) {
      next(err);
    }
  }

  // DELETE http://localhost:4000/api/members/:id
  private async deleteMember(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = +request.params.id;
      await membersService.deleteMember(id);
      response.sendStatus(StatusCode.NoContent);
    } catch (err: any) {
      next(err);
    }
  }

  private async getImageFile(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const imageName = request.params.imageName;
      const imagePath = fileSaver.getFilePath(imageName);
      response.sendFile(imagePath);
    } catch (err: any) {
      next(err);
    }
  }
}

const membersController = new MembersController();
export const membersRouter = membersController.router;
