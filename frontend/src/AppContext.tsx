import {
  createContext, useContext, useState, useEffect, useRef, useCallback, type ReactNode,
} from 'react';
import { state, bindShell } from './engine/shell';
import { PERSONAS } from './data/personas';
import { generateAskReply } from './engine/ask';
import { VIEWS } from './data/views';

type Theme = 'dark' | 'light';
type ToastKind = 'ok' | 'warn' | 'info' | '';
export interface ToastItem { id: number; title: string; sub: string; kind: ToastKind; leaving?: boolean }
export interface AskMessage { id: number; role: 'ai' | 'you' | 'typing'; html: string; label?: string }

interface AppCtx {
  persona: string;
  step: number;
  currentCell: string | null;
  currentView: string | null;
  theme: Theme;
  askOpen: boolean;
  toasts: ToastItem[];
  askMessages: AskMessage[];
  switchPersona: (key: string) => void;
  navHome: () => void;
  drillStat: (persona: string, cellId: string) => void;
  drillMini: (persona: string, idx: number) => void;
  gotoStep: (n: number) => void;
  openCell: (cellId: string) => void;
  openView: (id: string) => void;
  closeView: () => void;
  goTo: (id: string) => void;
  closeModal: () => void;
  toggleAsk: () => void;
  closeAsk: () => void;
  approveAction: (label: string) => void;
  toggleTheme: () => void;
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  pushToast: (title: string, sub: string, kind?: ToastKind) => void;
  askSubmit: (q: string) => void;
  askSugg: (q: string) => void;
}

const Ctx = createContext<AppCtx>(null as unknown as AppCtx);
export const useApp = () => useContext(Ctx);

const personaTitle = (p: any) => p.role.split('·')[0].trim();
const greeting = (key: string) => {
  const p = PERSONAS[key];
  return `<div class="ai-lbl">◆ CalvinBall AI</div>Hello ${p.first}. I'm holding context for the <strong>${personaTitle(p)}</strong> view. Ask me anything — or pick a suggestion.`;
};

let _uid = 1;

export function AppProvider({ children }: { children: ReactNode }) {
  const [persona, setPersonaState] = useState('dp');
  const [step, setStepState] = useState(1);
  const [currentCell, setCurrentCellState] = useState<string | null>(null);
  const [currentView, setCurrentViewState] = useState<string | null>(null);
  const [theme, setThemeState] = useState<Theme>('dark');
  const [askOpen, setAskOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(() => {
    try { return localStorage.getItem('csc_sb_collapsed') === '1'; } catch { return false; }
  });
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [askMessages, setAskMessages] = useState<AskMessage[]>([
    { id: _uid++, role: 'ai', html: greeting('dp') },
  ]);

  // ── Toasts ─────────────────────────────────────────────
  const pushToast = useCallback((title: string, sub: string, kind: ToastKind = '') => {
    const id = _uid++;
    // show one at a time (replace) so toasts never stack over content
    setToasts([{ id, title, sub, kind }]);
    setTimeout(() => setToasts((t) => t.map((x) => (x.id === id ? { ...x, leaving: true } : x))), 3000);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3300);
  }, []);

  // ── Theme ──────────────────────────────────────────────
  const applyTheme = useCallback((t: Theme) => {
    document.documentElement.setAttribute('data-theme', t);
    setThemeState(t);
  }, []);
  const toggleTheme = useCallback(() => {
    const cur = (document.documentElement.getAttribute('data-theme') as Theme) || 'dark';
    const next: Theme = cur === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    try { localStorage.setItem('csc_theme', next); } catch { /* noop */ }
    // no toast — the theme change is its own feedback
  }, [applyTheme]);

  // ── Journey ────────────────────────────────────────────
  const updateJourney = useCallback(() => setStepState(state.step), []);

  // ── Modal / cells ──────────────────────────────────────
  const openCell = useCallback((cellId: string) => {
    state.currentCell = cellId;
    setCurrentCellState(cellId);
    if (cellId.includes('brief')) state.step = 1;
    else if (cellId.includes('why')) state.step = 2;
    else if (cellId.includes('signal')) state.step = 3;
    setStepState(state.step);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeModal = useCallback(() => {
    state.currentCell = null;
    setCurrentCellState(null);
    document.body.style.overflow = '';
  }, []);

  // ── Full-screen views (Forecast Viewer / Consensus Workbook) ──
  const openView = useCallback((id: string) => {
    if (!VIEWS[id]) return;
    state.currentView = id;
    state.currentCell = null;
    setCurrentViewState(id);
    setCurrentCellState(null);
    document.body.style.overflow = '';
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);
  const closeView = useCallback(() => {
    state.currentView = null;
    setCurrentViewState(null);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  // ── Persona switching ──────────────────────────────────
  const switchPersona = useCallback((key: string) => {
    state.persona = key;
    state.step = 1;
    state.currentView = null;
    setCurrentViewState(null);
    setPersonaState(key);
    setStepState(1);
    setAskMessages([{ id: _uid++, role: 'ai', html: greeting(key) }]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // no toast — switching visibly changes the whole page, so a toast is redundant
  }, []);

  const navHome = useCallback(() => switchPersona(state.persona), [switchPersona]);

  const drillStat = useCallback((p: string, cellId: string) => {
    if (state.persona !== p) {
      state.persona = p;
      setPersonaState(p);
      setAskMessages([{ id: _uid++, role: 'ai', html: greeting(p) }]);
    }
    setTimeout(() => openCell(cellId), 80);
  }, [openCell]);

  const drillMini = useCallback((p: string, idx: number) => {
    const targets: Record<string, string[]> = {
      csco: ['csco-why', 'csco-brief', 'csco-why'],
      dp: ['dp-why', 'dp-brief', 'dp-signal'],
      inv: ['inv-why', 'inv-why', 'inv-brief'],
      qcomm: ['qcomm-why', 'qcomm-signal', 'qcomm-brief'],
    };
    const list = targets[p] || ['csco-brief'];
    drillStat(p, list[idx] || list[0]);
  }, [drillStat]);

  const gotoStep = useCallback((n: number) => {
    const targets: Record<number, string> = {
      1: state.persona + '-brief',
      2: state.persona + '-why',
      3: state.persona + '-signal',
      4: state.persona + '-signal',
    };
    if (targets[n]) openCell(targets[n]);
  }, [openCell]);

  const approveAction = useCallback((label: string) => {
    pushToast(label, 'Action queued · approval routed to Vikram Mehta', 'ok');
    state.step = 4;
    setStepState(4);
    setTimeout(() => closeModal(), 900);
  }, [pushToast, closeModal]);

  // ── Ask widget ─────────────────────────────────────────
  const toggleAsk = useCallback(() => setAskOpen((o) => !o), []);
  const closeAsk = useCallback(() => setAskOpen(false), []);

  const toggleSidebar = useCallback(() => {
    setSidebarCollapsed((c) => {
      const n = !c;
      try { localStorage.setItem('csc_sb_collapsed', n ? '1' : '0'); } catch { /* noop */ }
      return n;
    });
  }, []);

  // ── Unified nav router (sidebar + library) ─────────────
  const goTo = useCallback((id: string) => {
    if (id === 'home') { if (state.currentView) closeView(); else navHome(); return; }
    if (VIEWS[id]) { openView(id); return; }
    if (id.endsWith('-ask')) { if (state.currentView) closeView(); toggleAsk(); return; }
    if (state.currentView) closeView();
    openCell(id);
  }, [closeView, navHome, openView, openCell, toggleAsk]);

  const askSubmit = useCallback((raw: string) => {
    const q = raw.trim();
    if (!q) return;
    setAskMessages((m) => [...m, { id: _uid++, role: 'you', html: q }]);
    state.askHistory.push({ role: 'you', text: q, time: new Date() });
    const typingId = _uid++;
    setAskMessages((m) => [...m, {
      id: typingId, role: 'typing',
      html: '<div class="ai-lbl">◆ CalvinBall AI · thinking</div><span style="color:var(--t-3);font-size:13px">···</span>',
    }]);
    setTimeout(() => {
      const reply: any = generateAskReply(q);
      setAskMessages((m) => m.filter((x) => x.id !== typingId).concat({
        id: _uid++, role: 'ai', html: reply.html,
        label: `◆ CalvinBall AI · ${(reply.time || 1.2).toFixed(1)}s`,
      }));
      state.askHistory.push({ role: 'ai', text: reply.text || '', html: reply.html, time: new Date() });
    }, 900 + Math.random() * 600);
  }, []);

  const askSugg = useCallback((q: string) => askSubmit(q), [askSubmit]);

  // ── Bind the ported engine bridge + window globals ─────
  const apiRef = useRef<AppCtx>(null as unknown as AppCtx);
  const api: AppCtx = {
    persona, step, currentCell, currentView, theme, askOpen, toasts, askMessages, sidebarCollapsed,
    switchPersona, navHome, drillStat, drillMini, gotoStep, openCell, openView, closeView, goTo, closeModal,
    toggleAsk, closeAsk, approveAction, toggleTheme, toggleSidebar, pushToast, askSubmit, askSugg,
  };
  apiRef.current = api;

  useEffect(() => {
    bindShell({
      toast: (t, s, k) => apiRef.current.pushToast(t, s, k as ToastKind),
      updateJourney,
      closeModal: () => apiRef.current.closeModal(),
    });
    // inline onclick handlers inside injected HTML resolve against window
    Object.assign(window as any, {
      openCell: (id: string) => apiRef.current.openCell(id),
      openView: (id: string) => apiRef.current.openView(id),
      closeView: () => apiRef.current.closeView(),
      goTo: (id: string) => apiRef.current.goTo(id),
      closeModal: () => apiRef.current.closeModal(),
      switchPersona: (k: string) => apiRef.current.switchPersona(k),
      navHome: () => apiRef.current.navHome(),
      drillStat: (p: string, c: string) => apiRef.current.drillStat(p, c),
      drillMini: (p: string, i: number) => apiRef.current.drillMini(p, i),
      gotoStep: (n: number) => apiRef.current.gotoStep(n),
      toggleAsk: () => apiRef.current.toggleAsk(),
      closeAsk: () => apiRef.current.closeAsk(),
      approveAction: (l: string) => apiRef.current.approveAction(l),
      toggleTheme: () => apiRef.current.toggleTheme(),
      askSugg: (q: string) => apiRef.current.askSugg(q),
    });
    // load saved theme (no auto "welcome" toast — it overlapped content on load)
    let saved: string | null = null;
    try { saved = localStorage.getItem('csc_theme'); } catch { /* noop */ }
    applyTheme(saved === 'light' ? 'light' : 'dark');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // keyboard shortcuts (persona switch + escape)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement)?.tagName === 'INPUT') return;
      const map: Record<string, string> = { '1': 'csco', '2': 'dp', '3': 'inv', '4': 'qcomm' };
      if (map[e.key]) apiRef.current.switchPersona(map[e.key]);
      if (e.key === 'Escape') { apiRef.current.closeModal(); apiRef.current.closeAsk(); }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}
