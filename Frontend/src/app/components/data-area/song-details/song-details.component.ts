import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { SongModel } from "../../../models/song-model";
import { Title } from "@angular/platform-browser";
import { MusicService } from "../../../services/data.service";
import { CommonModule } from "@angular/common";
import { AlbumModel } from "../../../models/album-model";

@Component({
  selector: "app-song-details",
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: "./song-details.component.html",
  styleUrl: "./song-details.component.css",
})
export class SongDetailsComponent implements OnInit {
  public song: SongModel;
  public lyrics: string[];
  public albums: AlbumModel[];

  public constructor(
    private title: Title,
    private musicService: MusicService,
    private activatedRoute: ActivatedRoute
  ) {}

  public async ngOnInit(): Promise<void> {
    try {
      this.albums = await this.musicService.getAllAlbums();
      const id = +this.activatedRoute.snapshot.params["id"];
      this.song = await this.musicService.getOneSong(id);
      this.title.setTitle("TRIOT | " + this.song.name);
      this.formatLyrics();
    } catch (err: any) {
      alert(err.message);
    }
  }

  public getAlbumImage(albumId: number): string {
    return this.albums.find((a) => a.id === albumId).imageUrl;
  }

  public formatLyrics() {
    this.lyrics = this.song.lyrics.split("©️");
  }
}
