import express, { NextFunction, Request, Response } from "express";
import { albumsService } from "../5-services/albums-service";
import { AlbumModel } from "../3-models/album-model";
import { StatusCode } from "../3-models/error-enum";
import { fileSaver } from "uploaded-file-saver";

// albums controller:
class AlbumsController {
  // Create a router object for listening to HTTP requests:
  public readonly router = express.Router();

  // Register routes once:
  public constructor() {
    this.registerRoutes();
  }

  // Register routes:
  private registerRoutes(): void {
    this.router.get("/albums", this.getAllAlbums);
    this.router.get("/albums/:id(\\d+)", this.getOneAlbum);
    this.router.post("/albums", this.addAlbum);
    this.router.put("/albums/:id(\\d+)", this.updateAlbum);
    this.router.delete("/albums/:id(\\d+)", this.deleteAlbum);
    this.router.get("/albums/images/:imageName", this.getImageFile);
  }

  // GET http://localhost:4000/api/albums
  private async getAllAlbums(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const albums = await albumsService.getAllAlbums();
      response.json(albums);
    } catch (err: any) {
      next(err);
    }
  }

  // GET http://localhost:4000/api/albums/:id
  private async getOneAlbum(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = +request.params.id;
      const album = await albumsService.getOneAlbum(id);
      response.json(album);
    } catch (err: any) {
      next(err);
    }
  }

  // POST http://localhost:4000/api/albums
  private async addAlbum(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      request.body.image = request.files?.image;
      const album = new AlbumModel(request.body);
      const addedAlbum = await albumsService.addAlbum(album);
      response.status(StatusCode.Created).json(addedAlbum);
    } catch (err: any) {
      next(err);
    }
  }

  // PUT http://localhost:4000/api/albums/:id
  private async updateAlbum(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      request.body.id = +request.params.id;
      request.body.image = request.files?.image;
      const album = new AlbumModel(request.body);
      const updatedAlbum = await albumsService.updateAlbum(album);
      response.json(updatedAlbum);
    } catch (err: any) {
      next(err);
    }
  }

  // DELETE http://localhost:4000/api/albums/:id
  private async deleteAlbum(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = +request.params.id;
      await albumsService.deleteAlbum(id);
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

const albumsController = new AlbumsController();
export const albumsRouter = albumsController.router;
