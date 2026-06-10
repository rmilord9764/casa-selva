import fs from 'fs'; import path from 'path'; import { fileURLToPath } from 'url';
import { pool } from './pool.js';
const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), 'migrations');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.sql')).sort();
for (const f of files) { console.log('Aplicando', f); await pool.query(fs.readFileSync(path.join(dir, f), 'utf8')); }
console.log('Migraciones aplicadas'); process.exit(0);
