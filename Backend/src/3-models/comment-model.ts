import Joi from "joi";
import { ValidationError } from "./client-errors";

export class CommentModel {
  public id: number;
  public message: string;
  public userId: number;
  public songId: number;

  public constructor(comment: CommentModel) {
    this.id = comment.id;
    this.message = comment.message;
    this.userId = comment.userId;
    this.songId = comment.songId;
  }

  public static insertValidationSchema = Joi.object({
    id: Joi.number().forbidden(),
    message: Joi.string().required().max(300).min(2),
    userId: Joi.number().required(),
    songId: Joi.number().required(),
  });

  public validateInsert(): void {
    const result = CommentModel.insertValidationSchema.validate(this);
    if (result.error) throw new ValidationError(result.error.message);
  }
}
