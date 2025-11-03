import aj from '#config/arcjet.js';
import logger from '#config/logger.js';

const securityMiddleware = async (req, res, next) => {
  try {
    const role = req.user?.role || 'guest';

    let limit;
    let message;

    switch (role) {
      case 'admin':
        limit = 20;
        message =
          'Admin request limit(20 per minute) exceeded. Please try again later.';
        break;
      case 'user':
        limit = 10;
        message =
          'User request limit(10 per minute) exceeded. Please try again later.';
        break;
      case 'guest':
        limit = 5;
        message =
          'Guest request limit(5 per minute) exceeded. Please try again later.';
        break;
    }

    const client = aj.withRule([
      {
        mode: 'LIVE',
        interval: '1m',
        max: limit,
        name: `${role}-rate-limit`,
      },
    ]);

    const decision = await client.protect(req);
    if (decision.isDenied() && decision.reason.isBot()) {
      logger.warn('Bot detected and blocked.', {
        ip: req.ip,
        userAgent: req.get('User-Agent'),
        path: req.path,
      });

      return res.status(403).json({
        error: 'Forbidden',
        message: 'Access denied due to suspected bot activity.',
      });
    }

    if (decision.isDenied() && decision.reason.isShield()) {
      logger.warn('Shield block request.', {
        ip: req.ip,
        userAgent: req.get('User-Agent'),
        path: req.path,
        method: req.method,
      });

      return res.status(403).json({
        error: 'Forbidden',
        message: 'Your request has been blocked by our security shield.',
      });
    }

    if (decision.isDenied() && decision.reason.isRateLimit()) {
      logger.warn('Rate limit exceed.', {
        ip: req.ip,
        userAgent: req.get('User-Agent'),
        path: req.path,
        method: req.method,
      });

      return res.status(403).json({
        error: 'Forbidden',
        message,
      });
    }

    logger.info('Request passed security middleware.');
    next();
  } catch (error) {
    res.status(500).json({
      error: 'Internal Server Error',
      message:
        error.message || 'Something went wrong with security middleware.',
    });
  }
};

export default securityMiddleware;
