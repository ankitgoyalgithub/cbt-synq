import { createRoot } from 'react-dom/client';
import App, { Cockpit } from '../src/App';
import { AuthProvider } from '../src/auth/AuthContext';

declare const globalThis: any;
async function tick(ms: number) { await new Promise((r) => setTimeout(r, ms)); }

(async () => {
  const results: [string, boolean][] = [];
  const W = globalThis.window as any;

  // 1) gated <App/> shows the login screen when logged out
  const gateHost = document.createElement('div');
  document.body.appendChild(gateHost);
  createRoot(gateHost).render(<App />);
  await tick(150);
  results.push(['gate shows login when logged out', /auth-card/.test(gateHost.innerHTML) && /Sign in/.test(gateHost.innerHTML)]);

  // 2) cockpit (gate bypassed) wires bridges + initializes flagships
  const root = createRoot(document.getElementById('root')!);
  root.render(<AuthProvider><Cockpit /></AuthProvider>);
  await tick(150);

  results.push(['window.openCell bridge', typeof W.openCell === 'function']);
  results.push(['window.simUpdate engine fn', typeof W.simUpdate === 'function']);
  results.push(['cockpit populated', (document.getElementById('root')!.innerHTML.length) > 2000]);

  W.openCell('inv-signal');
  await tick(120);
  const cover = document.getElementById('simCover');
  results.push(['inv-signal mounted', !!document.getElementById('simQty')]);
  results.push(['simUpdate populated cover', !!cover && /days/.test(cover.textContent || '')]);

  W.openCell('dp-signal');
  await tick(120);
  const stackTotal = document.getElementById('stackTotal');
  results.push(['dp-signal stack total = 75%', !!stackTotal && (stackTotal.textContent || '').trim() === '75%']);

  W.openCell('qcomm-signal');
  await tick(120);
  results.push(['qcomm 24 store nodes', document.querySelectorAll('#qmapStores .store').length === 24]);
  W.qcStopLoops();

  let ok = true;
  for (const [n, p] of results) { if (!p) ok = false; console.log((p ? 'PASS' : 'FAIL') + '  ' + n); }
  console.log(ok ? '\nALL CLIENT CHECKS PASSED' : '\nSOME CLIENT CHECKS FAILED');
  process.exit(ok ? 0 : 1);
})();
