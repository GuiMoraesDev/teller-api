import { JwtPayload, sign, verify } from 'jsonwebtoken';

import authConfig from '../../../config/auth';

class TokenProvider {
	private readonly defaultAuthSecret =
		authConfig.jwt.secret ?? 'thiscannotbeempty123456';

	private readonly defaultExpirationDateToken = authConfig.user.expiresIn;

	public generateToken(
		payload: { [key: string]: any },
		id_user: string
	): string {
		return sign(payload, this.defaultAuthSecret, {
			subject: id_user,
			expiresIn: this.defaultExpirationDateToken,
		});
	}

	public validateToken(token: string): string | JwtPayload {
		const result = verify(token, this.defaultAuthSecret);

		console.log('result', result);

		return result;
	}
}

export default TokenProvider;
