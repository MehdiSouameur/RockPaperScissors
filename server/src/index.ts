import express from 'express';
import path from 'path';

const app = express();
const PORT = 5000;

const distPath = path.join(__dirname, '../../client/dist');

// Serve static assets
app.use(express.static(distPath));

// API route
app.get('/api/hello', (_req, res) => {
  res.json({ message: 'Hello from server!' });
});

// Fallback: serve React index.html for client-side routes (no dots)
app.get(/^\/(?!api).*/, (_req, res) => {
  res.sendFile(path.join(__dirname, '../../client/dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
