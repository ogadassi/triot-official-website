import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { SongModel } from "../../../models/song-model";
import { Title } from "@angular/platform-browser";
import { MusicService } from "../../../services/data.service";
import { CommonModule } from "@angular/common";
import { AlbumModel } from "../../../models/album-model";
import { CommentsService } from "../../../services/comments.service";
import { CommentModel } from "../../../models/comment-model";
import { appStore } from "../../../../redux/Store";
import { UserModel } from "../../../models/user-model";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-song-details",
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: "./song-details.component.html",
  styleUrl: "./song-details.component.css",
})
export class SongDetailsComponent implements OnInit {
  public user = appStore.getState().user;
  public users: UserModel[];

  public song: SongModel;
  public lyrics: string[];
  public albums: AlbumModel[];

  public comments: CommentModel[];
  public comment = new CommentModel();

  public constructor(
    private router: Router,
    private title: Title,
    private musicService: MusicService,
    private commentsService: CommentsService,
    private activatedRoute: ActivatedRoute
  ) {}

  public async ngOnInit(): Promise<void> {
    try {
      if (!this.user) {
        this.router.navigateByUrl("/home");
        return;
      }
      const id = +this.activatedRoute.snapshot.params["id"];

      this.song = await this.musicService.getOneSong(id);

      this.albums = await this.musicService.getAllAlbums();
      this.users = await this.commentsService.getAllUsers();

      this.comments = await this.commentsService.getCommentsBySongId(
        this.song.id
      );
      this.title.setTitle("TRIOT | " + this.song.name);

      this.formatLyrics();
    } catch (err: any) {
      this.router.navigateByUrl("/home");
    }
  }

  public getAlbumImage(albumId: number): string {
    if (this.song && this.albums) {
      const album = this.albums.find((a) => a.id === albumId);
      return album ? album.imageUrl : "";
    }
    return "";
  }

  public getUsername(userId: number): string {
    const user = this.users.find((u) => u.id === userId);
    return `${user?.firstName} ${user?.lastName}`;
  }

  public formatLyrics() {
    this.lyrics = this.song.lyrics.split("©️");
  }

  public async addComment() {
    try {
      this.comment.songId = this.song.id;
      this.comment.userId = this.user.id;
      await this.commentsService.addComment(this.comment);
      this.comments = await this.commentsService.getCommentsBySongId(
        this.song.id
      );
      this.comment.message = "";
    } catch (err: any) {
      alert(err.message);
    }
  }
}
