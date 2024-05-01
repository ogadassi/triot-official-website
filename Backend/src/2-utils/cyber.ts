import { UserModel } from "../3-models/user-model";
import jwt, { SignOptions } from "jsonwebtoken";
import { appConfig } from "./app-config";

import crypto from "crypto";

class Cyber {
  public getNewToken(user: UserModel): string {
    // Remove password from user:
    delete user.password;

    // Create container object containing the user:
    const container = { user };

    // Create options:
    const options: SignOptions = { expiresIn: "5h" };

    // Create token:
    const token = jwt.sign(container, appConfig.jwtSecretKey, options);

    // Return:
    return token;
  }

  // Check if token is valid:
  public isTokenValid(token: string): boolean {
    try {
      // If no token:
      if (!token) return false;

      // Verify token:
      jwt.verify(token, appConfig.jwtSecretKey);

      // All is good:
      return true;
    } catch (err: any) {
      // Token is not valid.
      return false;
    }
  }

  // Hash password:
  public hashPassword(plainText: string): string {
    // SHA = Secured Hashing Algorithm.
    // HMAC = Hash-Based Message Authentication Code
    const hashedPassword = crypto
      .createHmac("sha512", appConfig.passwordSalt)
      .update(plainText)
      .digest("hex");

    // Return:
    return hashedPassword;
  }
}

export const cyber = new Cyber();
