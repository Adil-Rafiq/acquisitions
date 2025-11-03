import arcjet, { shield, detectBot, slidingWindow } from '@arcjet/node';

const aj = arcjet({
  key: process.env.ARCJET_KEY,
  rules: [
    // Shield protects your app from common attacks e.g. SQL injection
    shield({ mode: 'LIVE' }),
    // Create a bot detection rule
    detectBot({
      mode: 'LIVE', // Blocks requests. Use "DRY_RUN" to log only
      // Block all bots except the following
      allow: [
        'CATEGORY:SEARCH_ENGINE', // Google, Bing, etc
        'CATEGORY:PREVIEW', // Link previews e.g. Slack, Discord
      ],
    }),
    // Create a sliding window rate limit rule
    slidingWindow({
      mode: 'LIVE', // Blocks requests. Use "DRY_RUN" to log only
      interval: '2s', // 2 second intervals
      max: 5, // Max 5 requests per interval
    }),
  ],
});

export default aj;
