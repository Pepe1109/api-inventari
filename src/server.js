import 'dotenv/config';
import app from './app.js';
import { connectDB } from './lib/db.js';

const PORT = process.env.PORT ?? 3000;

(async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`API Inventari lista en http://localhost:${PORT}`);
  });
})();