import { sign } from "jsonwebtoken";

import authConfig from "../../../config/auth";

class TokenProvider {
  private defaultAuthSecret =
    authConfig.jwt.secret || "thiscannotbeempty123456";
  private defaultExpirationDateToken = authConfig.user.expiresIn;

  public generateToken(
    payload: { [key: string]: any },
    id_user: string
  ): string {
    return sign(payload, this.defaultAuthSecret, {
      subject: id_user,
      expiresIn: this.defaultExpirationDateToken,
    });
  }
}

export default TokenProvider;
