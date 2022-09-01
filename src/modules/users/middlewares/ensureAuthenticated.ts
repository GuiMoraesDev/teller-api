import { Request, Response, NextFunction } from 'express';

import TokenProvider from '../providers/TokenProvider';
const tokenProvider = new TokenProvider();

export default function ensureAuthenticated(
	request: Request,
	response: Response,
	next: NextFunction
): void {
	try {
		const { authorization } = request.headers;

		if (!authorization) {
			throw new Error('JWT token is missing');
		}

		const [, token] = authorization.split(' ');

		if (!token) {
			throw new Error('JWT token is missing');
		}

		const isValid = tokenProvider.validateToken(token);

		if (!isValid) {
			throw new Error('JWT token is invalid');
		}

		return next();
	} catch (err) {
		response.status(401).json({ message: 'Invalid token' });
	}
}
