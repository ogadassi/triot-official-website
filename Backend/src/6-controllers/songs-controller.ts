import express, { NextFunction, Request, Response } from "express";
import { songsService } from "../5-services/songs-service";
import { SongModel } from "../3-models/song-model";
import { StatusCode } from "../3-models/error-enum";
import { securityMiddleware } from "../4-middleware/security-middleware";

// songs controller:
class SongsController {
  // Create a router object for listening to HTTP requests:
  public readonly router = express.Router();

  // Register routes once:
  public constructor() {
    this.registerRoutes();
  }

  // Register routes:
  private registerRoutes(): void {
    this.router.get(
      "/songs",
      securityMiddleware.verifyLoggedIn,
      this.getAllSongs
    );
    this.router.get("/songs/:id(\\d+)", this.getOneSong);
    this.router.get("/songs-by-album/:albumId(\\d+)", this.getSongsByAlbumId);
    this.router.get("/search/:searchStr", this.searchSong);
    this.router.post("/songs", this.addSong);
    this.router.put("/songs/:id(\\d+)", this.updateSong);
    this.router.delete("/songs/:id(\\d+)", this.deleteSong);
  }

  // GET http://localhost:4000/api/songs
  private async getAllSongs(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      console.log(request);

      const songs = await songsService.getAllSongs();
      response.json(songs);
    } catch (err: any) {
      next(err);
    }
  }

  // GET http://localhost:4000/api/songs/:id
  private async getOneSong(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = +request.params.id;
      const song = await songsService.getOneSong(id);
      response.json(song);
    } catch (err: any) {
      next(err);
    }
  }

  // GET http://localhost:4000/api/songs-by-album/:albumId
  private async getSongsByAlbumId(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const albumId = +request.params.albumId;
      const songs = await songsService.getSongsByAlbumId(albumId);
      response.json(songs);
    } catch (err: any) {
      next(err);
    }
  }

  // GET http://localhost:4000/api/search/:searchStr
  private async searchSong(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const searchStr = request.params.searchStr;
      const song = await songsService.searchSong(searchStr);
      response.json(song);
    } catch (err: any) {
      next(err);
    }
  }

  // POST http://localhost:4000/api/songs
  private async addSong(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      request.body.image = request.files?.image;
      const song = new SongModel(request.body);
      const addedSong = await songsService.addSong(song);
      response.status(StatusCode.Created).json(addedSong);
    } catch (err: any) {
      next(err);
    }
  }

  // PUT http://localhost:4000/api/songs/:id
  private async updateSong(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      request.body.id = +request.params.id;
      request.body.image = request.files?.image;
      const song = new SongModel(request.body);
      const updatedSong = await songsService.updateSong(song);
      response.json(updatedSong);
    } catch (err: any) {
      next(err);
    }
  }

  // DELETE http://localhost:4000/api/songs/:id
  private async deleteSong(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = +request.params.id;
      await songsService.deleteSong(id);
      response.sendStatus(StatusCode.NoContent);
    } catch (err: any) {
      next(err);
    }
  }
}

const songsController = new SongsController();
export const songsRouter = songsController.router;
