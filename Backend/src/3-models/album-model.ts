import { UploadedFile } from "express-fileupload";
import Joi from "joi";
import { ValidationError } from "./client-errors";

export class AlbumModel {
  public id: number;
  public name: string;
  public image: UploadedFile;
  public imageUrl: string;

  public constructor(album: AlbumModel) {
    this.id = album.id;
    this.name = album.name;
    this.image = album.image;
    this.imageUrl = album.imageUrl;
  }

  public static insertValidationSchema = Joi.object({
    id: Joi.number().forbidden(),
    name: Joi.string().required().max(100).min(2),
    image: Joi.object().required(),
    imageUrl: Joi.string().optional().max(200),
  });

  public static updateValidationSchema = Joi.object({
    id: Joi.number().required().min(1).integer(),
    name: Joi.string().required().max(100).min(2),
    image: Joi.object().optional(),
    imageUrl: Joi.string().optional().max(200),
  });

  public validateInsert(): void {
    const result = AlbumModel.insertValidationSchema.validate(this);
    if (result.error) throw new ValidationError(result.error.message);
  }

  public validateUpdate(): void {
    const result = AlbumModel.updateValidationSchema.validate(this);
    if (result.error) throw new ValidationError(result.error.message);
  }
}
