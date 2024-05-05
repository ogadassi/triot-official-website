import cors from "cors";
import express from "express";
import expressFileUpload from "express-fileupload";
import path from "path";
import { fileSaver } from "uploaded-file-saver";
import { appConfig } from "./2-utils/app-config";
import { errorsMiddleware } from "./4-middleware/errors-middleware";
import { loggerMiddleware } from "./4-middleware/logger-middleware";
import { albumsRouter } from "./6-controllers/albums-controller";
import { authRouter } from "./6-controllers/auth-controller";
import { songsRouter } from "./6-controllers/songs-controller";
import { membersRouter } from "./6-controllers/members-controller";
import { commentsRouter } from "./6-controllers/comments-controller";

// Main application class:
class App {
  // Express server:
  private server = express();

  // Start app:
  public start(): void {
    // Enable CORS requests:
    this.server.use(cors()); // Enable CORS for any frontend website.

    // Create a request.body containing the given json from the front:
    this.server.use(express.json());

    // Create request.files containing uploaded files:
    this.server.use(expressFileUpload());

    // Configure images folder:
    fileSaver.config(path.join(__dirname, "1-assets", "images"));

    // Register middleware:
    this.server.use(loggerMiddleware.logToConsole);

    // Connect any controller route to the server:
    this.server.use(
      "/api",
      authRouter,
      albumsRouter,
      songsRouter,
      membersRouter,
      commentsRouter
    );

    // Route not found middleware:
    this.server.use(errorsMiddleware.routeNotFound);

    // Catch all middleware:
    this.server.use(errorsMiddleware.catchAll);

    this.server.listen(appConfig.port, () =>
      console.log("Listening on http://localhost:" + appConfig.port)
    );
  }
}

const app = new App();
app.start();
