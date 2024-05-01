import { dal } from "../2-utils/dal";
import { OkPacketParams } from "mysql2";
import { SongModel } from "../3-models/song-model";
import { ResourceNotFoundError } from "../3-models/client-errors";

class SongsService {
  public async getAllSongs(): Promise<SongModel[]> {
    const sql = `SELECT * FROM songs ORDER BY albumId DESC`;
    const songs = await dal.execute(sql);
    return songs;
  }

  public async getOneSong(id: number): Promise<SongModel> {
    const sql = `select * from songs where id = ?`;
    const songs = await dal.execute(sql, [id]);
    if (!songs[0]) throw new ResourceNotFoundError(id);
    return songs[0];
  }

  public async getSongsByAlbumId(albumId: number): Promise<SongModel[]> {
    const sql = `select * from songs where albumId = ?`;
    const songs = await dal.execute(sql, [albumId]);
    return songs;
  }

  public async searchSong(searchStr: string): Promise<SongModel[]> {
    const sql = `select * from songs where name like ? `;
    const songs = await dal.execute(sql, [`%${searchStr}%`]);
    return songs;
  }

  public async addSong(song: SongModel): Promise<SongModel> {
    song.validateInsert();
    const sql = `insert into songs(name,albumId,durationInSeconds,description,lyrics) values(?,?,?,?,?)`;
    const info: OkPacketParams = await dal.execute(sql, [
      song.name,
      song.albumId,
      song.durationInSeconds,
      song.description,
      song.lyrics,
    ]);
    song.id = info.insertId;
    return song;
  }

  public async updateSong(song: SongModel): Promise<SongModel> {
    song.validateUpdate();
    const sql = `update songs set name = ?, albumId = ?, 
    durationInSeconds = ?, description = ?, lyrics = ?
    where id=?`;
    const info: OkPacketParams = await dal.execute(sql, [
      song.name,
      song.albumId,
      song.durationInSeconds,
      song.description,
      song.lyrics,
      song.id,
    ]);
    if (!info.affectedRows) throw new ResourceNotFoundError(song.id);
    song = await songsService.getOneSong(song.id);
    return song;
  }

  public async deleteSong(id: number): Promise<void> {
    const sql = `DELETE FROM songs WHERE id = ${id}`;
    const info: OkPacketParams = await dal.execute(sql);
    if (info.affectedRows === 0) throw new ResourceNotFoundError(id);
  }
}

export const songsService = new SongsService();
