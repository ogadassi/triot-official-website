import { provideHttpClient } from "@angular/common/http";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";

export const appConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
  ],

  albumsUrl: "http://localhost:4000/api/albums/",
  membersUrl: "http://localhost:4000/api/members/",
  songsUrl: "http://localhost:4000/api/songs/",
  usersUrl: "http://localhost:4000/api/users/",
  songsByAlbumUrl: "http://localhost:4000/api/songs-by-album/",
  songSearchUrl: "http://localhost:4000/api/search/",
  registerUrl: "http://localhost:4000/api/register/",
  loginUrl: "http://localhost:4000/api/login/",
  commentsUrl: "http://localhost:4000/api/comments/",
  commentsByUserUrl: "http://localhost:4000/api/comments-by-user/",
  commentsBySongUrl: "http://localhost:4000/api/comments-by-song/",
};
