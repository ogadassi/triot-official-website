import { OkPacketParams } from "mysql2";
import { fileSaver } from "uploaded-file-saver";
import { appConfig } from "../2-utils/app-config";
import { dal } from "../2-utils/dal";
import { AlbumModel } from "../3-models/album-model";
import { ResourceNotFoundError } from "../3-models/client-errors";

class AlbumsService {
  public async getAllAlbums(): Promise<AlbumModel[]> {
    const sql = `SELECT *,CONCAT(?, imageName) as imageUrl FROM albums`;
    const albums = await dal.execute(sql, [appConfig.baseImageUrl]);
    return albums;
  }

  public async getOneAlbum(id: number): Promise<AlbumModel> {
    const sql = `select *,CONCAT(?, imageName) as imageUrl from albums where id = ?`;
    const albums = await dal.execute(sql, [appConfig.baseImageUrl, id]);
    if (!albums[0]) throw new ResourceNotFoundError(id);
    return albums[0];
  }

  public async addAlbum(album: AlbumModel): Promise<AlbumModel> {
    album.validateInsert();
    const imageName = await fileSaver.add(album.image);
    const sql = `insert into albums(name,imageName)
    values(?,?)`;
    const info: OkPacketParams = await dal.execute(sql, [
      album.name,
      imageName,
    ]);
    album = await this.getOneAlbum(info.insertId);
    return album;
  }

  public async updateAlbum(album: AlbumModel): Promise<AlbumModel> {
    album.validateUpdate();
    const oldImageName = await this.getImageName(album.id);
    const imageName = album.image
      ? await fileSaver.update(oldImageName, album.image)
      : oldImageName;
    const sql = `update albums set name = ?, imageName = ? where id=?`;
    const info: OkPacketParams = await dal.execute(sql, [
      album.name,
      imageName,
      album.id,
    ]);
    if (!info.affectedRows) throw new ResourceNotFoundError(album.id);
    album = await albumsService.getOneAlbum(album.id);

    return album;
  }

  public async deleteAlbum(id: number): Promise<void> {
    const imageName = await this.getImageName(id);
    const sql = `DELETE FROM albums WHERE id = ?`;
    const info: OkPacketParams = await dal.execute(sql, [id]);
    if (info.affectedRows === 0) throw new ResourceNotFoundError(id);
    await fileSaver.delete(imageName);
  }

  private async getImageName(id: number): Promise<string> {
    const sql = `SELECT imageName FROM albums WHERE id = ${id}`;
    const albums = await dal.execute(sql);
    const album = albums[0];
    if (!album) return null;
    const imageName = album.imageName;
    return imageName;
  }
}

export const albumsService = new AlbumsService();
