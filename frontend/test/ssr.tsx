import { renderToString } from 'react-dom/server';
import App, { Cockpit } from '../src/App';
import { AuthProvider } from '../src/auth/AuthContext';
import { CELLS } from '../src/data/cells';
import { HERO_TILES } from '../src/data/content';

// gated app (SSR: effects don't run, so the boot gate shows; the login screen itself
// is asserted in the client test where effects run)
const gate = renderToString(<App />);
// cockpit tree rendered directly (bypassing the auth gate)
const app = renderToString(<AuthProvider><Cockpit /></AuthProvider>);

const checks: [string, boolean][] = [
  ['gated app renders boot gate', gate.includes('Connecting to Back4App')],
  ['cockpit mounts (len>2000)', app.length > 2000],
  ['cockpit persona Vikram', app.includes('Vikram Mehta')],
  ['cockpit persona cards x4', (app.match(/data-persona=/g) || []).length === 4],
  ['cockpit hero tiles injected', app.includes('The CSCO Wednesday Canvas')],
  ['cockpit library injected', app.includes('More from')],
  ['cockpit ask fab', app.includes('ask-fab')],
  ['cockpit Log Out present', app.includes('Log Out')],
  ['all 16 cells present', Object.keys(CELLS).length === 16],
  ['hero tiles for 4 personas', ['csco','dp','inv','qcomm'].every((k) => !!HERO_TILES[k])],
];
let ok = true;
for (const [name, pass] of checks) { if (!pass) ok = false; console.log((pass ? 'PASS' : 'FAIL') + '  ' + name); }
console.log(ok ? '\nALL SSR CHECKS PASSED' : '\nSOME CHECKS FAILED');
process.exit(ok ? 0 : 1);
