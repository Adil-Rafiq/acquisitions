import app from './app.js';

const BASE_URL = process.env.BASE_URL || 'http://localhost';
const PORT = process.env.PORT || 3000;

console.log('ENV_CHECK: ', process.env.ENV_CHECK);

app.listen(PORT, () => {
  console.log(`Listening on ${BASE_URL}:${PORT}`);
});
