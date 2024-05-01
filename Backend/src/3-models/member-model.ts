import { UploadedFile } from "express-fileupload";
import Joi from "joi";
import { ValidationError } from "./client-errors";

export class MemberModel {
  public id: number;
  public firstName: string;
  public lastName: string;
  public bio: string;
  public part: string;
  public image: UploadedFile;
  public imageUrl: string;

  public constructor(member: MemberModel) {
    this.id = member.id;
    this.firstName = member.firstName;
    this.lastName = member.lastName;
    this.bio = member.bio;
    this.part = member.part;
    this.image = member.image;
    this.imageUrl = member.imageUrl;
  }

  public static insertValidationSchema = Joi.object({
    id: Joi.number().forbidden(),
    firstName: Joi.string().required().max(45).min(2),
    lastName: Joi.string().required().max(45).min(2),
    bio: Joi.string().required().max(200).min(10),
    part: Joi.string().required().max(100).min(2),
    image: Joi.object().required(),
    imageUrl: Joi.string().optional().max(200),
  });

  public static updateValidationSchema = Joi.object({
    id: Joi.number().required().min(1).integer(),
    firstName: Joi.string().required().max(45).min(2),
    lastName: Joi.string().required().max(45).min(2),
    bio: Joi.date().required().max(200).min(10),
    part: Joi.date().required().max(100).min(2),
    image: Joi.object().optional(),
    imageUrl: Joi.string().optional().max(200),
  });

  public validateInsert(): void {
    const result = MemberModel.insertValidationSchema.validate(this);
    if (result.error) throw new ValidationError(result.error.message);
  }

  public validateUpdate(): void {
    const result = MemberModel.updateValidationSchema.validate(this);
    if (result.error) throw new ValidationError(result.error.message);
  }
}
