import { Component, Input, OnInit } from "@angular/core";
import { AlbumModel } from "../../../models/album-model";
import { SongModel } from "../../../models/song-model";
import { MusicService } from "../../../services/data.service";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { appStore } from "../../../../redux/Store";

@Component({
  selector: "app-data-list",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: "./data-list.component.html",
  styleUrl: "./data-list.component.css",
})
export class DataListComponent implements OnInit {
  public song: SongModel;
  public user = appStore.getState().user;
  public albumId = "all";
  public searchStr: string;
  public albums: AlbumModel[];
  public songs: SongModel[];

  public constructor(
    private musicService: MusicService,
    private title: Title
  ) {}

  public async ngOnInit(): Promise<void> {
    this.title.setTitle("TRIOT | Songs");
    if (this.user) {
      this.albums = await this.musicService.getAllAlbums();
      this.songs = await this.musicService.getAllSongs();
    }
  }

  public getSongLength(durationInSeconds: number): string {
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = durationInSeconds % 60;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minutes}:${formattedSeconds}`;
  }

  public async filterSongs() {
    if (this.albumId === "all")
      this.songs = await this.musicService.getAllSongs();
    else this.songs = await this.musicService.getSongsByAlbumId(+this.albumId);
    this.searchStr = null;
  }

  public async searchSongs() {
    if (this.searchStr) {
      this.songs = await this.musicService.searchSong(this.searchStr);
      this.albumId = null;
    } else this.songs = await this.musicService.getAllSongs();
  }

  public getAlbumImage(albumId: number): string {
    return this.albums.find((a) => a.id === albumId).imageUrl;
  }
}
