import logger from '#config/logger.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET_KEY = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';

export const jwtToken = {
  sign: payload => {
    try {
      return jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: JWT_EXPIRES_IN });
    } catch (error) {
      logger.error('Error signing JWT:', error);
      throw error;
    }
  },

  verify: token => {
    try {
      return jwt.verify(token, JWT_SECRET_KEY);
    } catch (error) {
      logger.error('Error verifying JWT:', error);
      throw error;
    }
  },
};
