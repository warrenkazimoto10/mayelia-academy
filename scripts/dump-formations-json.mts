/**
 * Génère src/data/mayelia-formations.json pour le seeder Laravel.
 * Usage : npm run seed:dump-formations
 */
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { FORMATIONS_SEED_DOMAINES } from '../src/data/formationsSeedExport.ts';

const root = dirname(fileURLToPath(import.meta.url));
const out = join(root, '..', 'src', 'data', 'mayelia-formations.json');
writeFileSync(out, JSON.stringify({ domaines: FORMATIONS_SEED_DOMAINES }, null, 2), 'utf8');
console.log('Écrit :', out);
