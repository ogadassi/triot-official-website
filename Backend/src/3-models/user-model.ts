import Joi from "joi";
import { ValidationError } from "./client-errors";

export class UserModel {
  public id: number;
  public firstName: string;
  public lastName: string;
  public email: string;
  public password: string;

  public constructor(user: UserModel) {
    this.id = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.password = user.password;
  }

  public static insertValidationSchema = Joi.object({
    id: Joi.number().forbidden(),
    firstName: Joi.string().required().max(30).min(2),
    lastName: Joi.string().required().max(45).min(2),
    email: Joi.string().email().required().min(8).max(50),
    password: Joi.string().required().min(8).max(30),
  });

  public validateInsert(): void {
    const result = UserModel.insertValidationSchema.validate(this);
    if (result.error) throw new ValidationError(result.error.message);
  }
}
