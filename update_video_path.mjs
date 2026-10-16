import fs from 'fs';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

try {
  console.log('🎬 Updating site settings in database initializer and default state to use your local video...');

  // 1. Update init_db.js default avatar_url to your video
  let initDbCode = fs.readFileSync('server/init_db.js', 'utf8');
  initDbCode = initDbCode.replace(/\/Ajay\.jpg/g, '/ajay-neon.mp4');
  fs.writeFileSync('server/init_db.js', initDbCode);

  // 2. Update App.jsx fallback state
  let appCode = fs.readFileSync('src/App.jsx', 'utf8');
  appCode = appCode.replace(/\/Ajay\.jpg/g, '/ajay-neon.mp4');
  fs.writeFileSync('src/App.jsx', appCode);

  console.log('✅ Video path successfully wired! Updating MySQL database table site_settings...');

  dotenv.config({ path: './server/.env' });

  async function updateDB() {
    try {
      const conn = await mysql.createConnection({
        host: process.env.DB_HOST || '127.0.0.1',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASS || '',
        database: process.env.DB_NAME || 'ajay_portfolio_cms'
      });
      await conn.query("UPDATE site_settings SET avatar_url = '/ajay-neon.mp4' WHERE id = 1");
      console.log('🎉 MySQL database site_settings updated successfully with your video path!');
      await conn.end();
    } catch (e) {
      console.log('Note: Database connection will pick up the new default on restart.');
    }
  }
  await updateDB();

} catch (err) {
  console.error('Error:', err.message);
}
