import { createConnection } from 'typeorm';
import app from './app';
import { PORT } from './common/config';
import ORMConfig from './common/ormconfig';

createConnection(ORMConfig)
  .then(async () => {
    try {
      await app.listen(PORT, '::');
      app.log.info(`App is running on http://localhost:${PORT}`);
    } catch (err) {
      app.log.error(err);
      process.exit(1);
    }
  })
  .catch((errDB: Error) => {
    app.log.error(errDB.message);
    process.exit(1);
  });
