import { UploadedFile } from "express-fileupload";
import Joi from "joi";
import { ValidationError } from "./client-errors";

export class SongModel {
  public id: number;
  public name: string;
  public albumId: number;
  public durationInSeconds: number;
  public description: string;
  public lyrics: string;

  public constructor(song: SongModel) {
    this.id = song.id;
    this.name = song.name;
    this.albumId = song.albumId;
    this.durationInSeconds = song.durationInSeconds;
    this.description = song.description;
    this.lyrics = song.lyrics;
  }

  public static insertValidationSchema = Joi.object({
    id: Joi.number().forbidden(),
    name: Joi.string().required().max(100).min(2),
    albumId: Joi.number().required(),
    durationInSeconds: Joi.number().required().max(9999).min(2),
    description: Joi.string().required().max(300).min(10),
    lyrics: Joi.string().required().max(4000).min(100),
  });

  public static updateValidationSchema = Joi.object({
    id: Joi.number().required().min(1).integer(),
    name: Joi.string().required().max(100).min(2),
    albumId: Joi.number().required(),
    durationInSeconds: Joi.number().required().max(9999).min(2),
    description: Joi.string().required().max(300).min(10),
    lyrics: Joi.string().required().max(4000).min(100),
  });

  public validateInsert(): void {
    const result = SongModel.insertValidationSchema.validate(this);
    if (result.error) throw new ValidationError(result.error.message);
  }

  public validateUpdate(): void {
    const result = SongModel.updateValidationSchema.validate(this);
    if (result.error) throw new ValidationError(result.error.message);
  }
}
