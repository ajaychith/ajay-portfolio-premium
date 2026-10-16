import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

function unifiedCMSBackendPlugin() {
  const dbFilePath = path.resolve(process.cwd(), 'server/cms_database.json');
  const uploadsDir = path.resolve(process.cwd(), 'public/uploads');

  const readState = () => {
    try {
      if (fs.existsSync(dbFilePath)) {
        return JSON.parse(fs.readFileSync(dbFilePath, 'utf8'));
      }
    } catch (e) {}
    return {};
  };

  const writeState = async (newState) => {
    fs.mkdirSync(path.dirname(dbFilePath), { recursive: true });
    fs.writeFileSync(dbFilePath, JSON.stringify(newState, null, 2), 'utf8');
  };

  return {
    name: 'unified-cms-backend',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url.startsWith('/api/')) return next();

        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

        if (req.method === 'OPTIONS') {
          res.statusCode = 200;
          return res.end();
        }

        const parseBody = () =>
          new Promise((resolve) => {
            let body = '';
            req.on('data', (chunk) => (body += chunk));
            req.on('end', () => {
              try {
                resolve(body ? JSON.parse(body) : {});
              } catch {
                resolve({});
              }
            });
          });

        if (req.url === '/api/portfolio' && req.method === 'GET') {
          return res.end(JSON.stringify(readState()));
        }

        if (req.url === '/api/admin/login' && req.method === 'POST') {
          const body = await parseBody();
          const u = (body.username || '').trim().toLowerCase();
          const p = (body.password || '').trim();
          if (u === 'admin' && p === 'admin123') {
            return res.end(JSON.stringify({ token: 'live_cms_master_token_2026' }));
          }
          res.statusCode = 401;
          return res.end(JSON.stringify({ error: 'Invalid credentials' }));
        }

        if (req.url === '/api/admin/state' && req.method === 'PUT') {
          const body = await parseBody();
          await writeState(body);
          return res.end(JSON.stringify({ success: true, state: body }));
        }

        // Permanent Disk File Uploader (Base64 -> public/uploads/filename)
        if (req.url === '/api/admin/upload' && req.method === 'POST') {
          const body = await parseBody();
          if (!body.dataUrl || !body.fileName) {
            res.statusCode = 400;
            return res.end(JSON.stringify({ error: 'Missing file data' }));
          }
          fs.mkdirSync(uploadsDir, { recursive: true });
          const safeName = Date.now() + '-' + body.fileName.replace(/[^a-zA-Z0-9._-]/g, '_');
          const filePath = path.join(uploadsDir, safeName);
          const base64Data = body.dataUrl.replace(/^data:[^;]+;base64,/, '');
          fs.writeFileSync(filePath, Buffer.from(base64Data, 'base64'));
          const publicUrl = '/uploads/' + safeName;

          const state = readState();
          const mediaList = Array.isArray(state.media) ? state.media : [];
          const newMedia = {
            id: Date.now(),
            name: body.fileName,
            url: publicUrl,
            type: body.fileType?.startsWith('video') ? 'video' : 'image'
          };
          state.media = [newMedia, ...mediaList];
          await writeState(state);

          return res.end(JSON.stringify({ success: true, url: publicUrl, media: newMedia }));
        }

        if (req.url === '/api/contact' && req.method === 'POST') {
          const body = await parseBody();
          const state = readState();
          const messages = Array.isArray(state.messages) ? state.messages : [];
          messages.unshift({
            id: Date.now(),
            sender_name: body.sender_name || 'Anonymous',
            sender_email: body.sender_email || '',
            phone: body.phone || '',
            budget: body.budget || '',
            message: body.message || '',
            created_at: new Date().toLocaleString()
          });
          state.messages = messages;
          await writeState(state);
          return res.end(JSON.stringify({ success: true }));
        }

        return next();
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), unifiedCMSBackendPlugin()],
  server: {
    host: true,
    port: 5173
  }
});