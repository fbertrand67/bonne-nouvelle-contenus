// Vérifie contenus.json avec les mêmes règles que l'app (src/content/remote.ts).
// Usage : node valider.mjs — sort en erreur au moindre problème, pour qu'un
// fichier cassé ne soit jamais publié.
import { readFileSync } from 'node:fs';

const CATEGORIES = ['motivation', 'humour', 'bien-etre', 'developpement', 'curiosite', 'defi', 'planete', 'monde'];
const TYPES = ['quote', 'fact', 'challenge', 'actu'];
const LANGS = ['fr', 'en', 'es', 'de'];
const DAY = /^\d{4}-\d{2}-\d{2}$/;
// Au-delà, l'app ignore le contenu (texte) ou la fin du fichier (nombre).
const MAX_TEXT_LENGTH = 280;
const MAX_ITEMS = 1000;

const errors = [];
let data;
try {
  data = JSON.parse(readFileSync(new URL('./contenus.json', import.meta.url), 'utf8'));
} catch (e) {
  console.error(`❌ contenus.json n'est pas un JSON valide : ${e.message}`);
  process.exit(1);
}

if (data.version !== 1) errors.push('« version » doit valoir 1');
if (!Array.isArray(data.items)) errors.push('« items » doit être une liste');
else if (data.items.length > MAX_ITEMS) errors.push(`${data.items.length} contenus : ${MAX_ITEMS} au maximum`);

const seen = new Set();
(data.items ?? []).forEach((it, i) => {
  const where = `élément ${i + 1}${it?.id ? ` (${it.id})` : ''}`;
  if (typeof it?.id !== 'string' || !it.id.startsWith('r-')) errors.push(`${where} : l'id doit commencer par « r- »`);
  else if (seen.has(it.id)) errors.push(`${where} : id en double`);
  else seen.add(it.id);
  if (!CATEGORIES.includes(it?.category)) errors.push(`${where} : catégorie inconnue « ${it?.category} » (attendu : ${CATEGORIES.join(', ')})`);
  if (!TYPES.includes(it?.type)) errors.push(`${where} : type inconnu « ${it?.type} » (attendu : ${TYPES.join(', ')})`);
  for (const l of LANGS) {
    if (typeof it?.text?.[l] !== 'string' || !it.text[l].trim()) errors.push(`${where} : texte « ${l} » manquant`);
    else if (it.text[l].trim().length > MAX_TEXT_LENGTH)
      errors.push(`${where} : texte « ${l} » trop long (${it.text[l].trim().length} caractères, ${MAX_TEXT_LENGTH} au maximum)`);
  }
  for (const k of ['from', 'until']) {
    if (it?.[k] !== undefined && !(typeof it[k] === 'string' && DAY.test(it[k]))) errors.push(`${where} : « ${k} » doit être au format AAAA-MM-JJ`);
  }
  if (it?.from && it?.until && it.from > it.until) errors.push(`${where} : « from » est après « until »`);
});

if (errors.length) {
  console.error(`❌ ${errors.length} problème(s) :\n- ${errors.join('\n- ')}`);
  process.exit(1);
}
console.log(`✅ contenus.json valide : ${data.items.length} contenus.`);
