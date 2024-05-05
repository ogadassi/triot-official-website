import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SongModel } from "../models/song-model";
import { appConfig } from "../app.config";
import { firstValueFrom } from "rxjs";
import { AlbumModel } from "../models/album-model";
import { MemberModel } from "../models/member-model";

@Injectable({
  providedIn: "root",
})
export class MusicService {
  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = sessionStorage.getItem("token");
    return new HttpHeaders().set("Authorization", `Bearer ${token}`);
  }

  public async getAllSongs(): Promise<SongModel[]> {
    const observable = this.http.get<SongModel[]>(appConfig.songsUrl, {
      headers: this.getHeaders(),
    });
    const songs = await firstValueFrom(observable);
    return songs;
  }

  public async getOneSong(id: number): Promise<SongModel> {
    const observable = this.http.get<SongModel>(appConfig.songsUrl + id, {
      headers: this.getHeaders(),
    });
    const song = await firstValueFrom(observable);
    return song;
  }

  public async getSongsByAlbumId(albumId: number): Promise<SongModel[]> {
    const observable = this.http.get<SongModel[]>(
      appConfig.songsByAlbumUrl + albumId,
      {
        headers: this.getHeaders(),
      }
    );

    const songs = await firstValueFrom(observable);
    return songs;
  }

  public async searchSong(searchStr: string): Promise<SongModel[]> {
    const observable = this.http.get<SongModel[]>(
      appConfig.songSearchUrl + searchStr,
      {
        headers: this.getHeaders(),
      }
    );

    const songs = await firstValueFrom(observable);
    return songs;
  }

  public async getAllAlbums(): Promise<AlbumModel[]> {
    const observable = this.http.get<AlbumModel[]>(appConfig.albumsUrl, {
      headers: this.getHeaders(),
    });
    const albums = await firstValueFrom(observable);
    return albums;
  }

  public async getOneAlbum(id: number): Promise<AlbumModel> {
    const observable = this.http.get<AlbumModel>(appConfig.albumsUrl + id, {
      headers: this.getHeaders(),
    });
    const album = await firstValueFrom(observable);
    return album;
  }

  public async getAllMembers(): Promise<MemberModel[]> {
    const observable = this.http.get<MemberModel[]>(appConfig.membersUrl);
    const members = await firstValueFrom(observable);
    return members;
  }

  public async getOneMember(id: number): Promise<MemberModel> {
    const observable = this.http.get<MemberModel>(appConfig.membersUrl + id);
    const member = await firstValueFrom(observable);
    return member;
  }
}
