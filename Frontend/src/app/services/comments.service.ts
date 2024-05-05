import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { appConfig } from "../app.config";
import { firstValueFrom } from "rxjs";
import { CommentModel } from "../models/comment-model";
import { UserModel } from "../models/user-model";

@Injectable({
  providedIn: "root",
})
export class CommentsService {
  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = sessionStorage.getItem("token");
    return new HttpHeaders().set("Authorization", `Bearer ${token}`);
  }

  public async getAllUsers(): Promise<UserModel[]> {
    const observable = this.http.get<UserModel[]>(appConfig.usersUrl, {
      headers: this.getHeaders(),
    });
    const users = await firstValueFrom(observable);
    return users;
  }

  public async getCommentsBySongId(songId: number): Promise<CommentModel[]> {
    const observable = this.http.get<CommentModel[]>(
      appConfig.commentsBySongUrl + songId,
      { headers: this.getHeaders() }
    );
    const comments = await firstValueFrom(observable);

    return comments;
  }

  public async addComment(comment: CommentModel): Promise<void> {
    const observable = this.http.post<CommentModel>(
      appConfig.commentsUrl,
      comment,
      { headers: this.getHeaders() }
    );
    await firstValueFrom(observable);
  }

  public async deleteComment(id: number): Promise<void> {
    const observable = this.http.delete<CommentModel>(
      appConfig.commentsUrl + id,
      { headers: this.getHeaders() }
    );
    await firstValueFrom(observable);
  }
}
