import app from './app';
import { PORT } from './common/config';

const start = async () => {
  try {
    await app.listen(PORT, '::');
    app.log.info(`App is running on http://localhost:${PORT}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};
start();
