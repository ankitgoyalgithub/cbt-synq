/* Shell bridge — the small set of "app shell" capabilities the ported engine needs.
   React binds real implementations into _bridge on mount, and keeps `state` in sync
   with its own state so the verbatim engine logic keeps working unchanged. */
/* eslint-disable */

export interface AppState {
  persona: string;
  step: number;
  currentCell: string | null;
  currentView: string | null;
  recentActions: Array<{ label: string; time: Date; persona: string; cell: string | null }>;
  askHistory: Array<{ role: string; text?: string; html?: string; time: Date }>;
}

export const state: AppState = {
  persona: 'dp',
  step: 1,
  currentCell: null,
  currentView: null,
  recentActions: [],
  askHistory: [],
};

type ToastKind = 'ok' | 'warn' | 'info' | '';
interface Bridge {
  toast: (title: string, sub: string, kind?: ToastKind) => void;
  updateJourney: () => void;
  closeModal: () => void;
}

const _bridge: Bridge = {
  toast: () => {},
  updateJourney: () => {},
  closeModal: () => {},
};

export function bindShell(b: Partial<Bridge>) {
  Object.assign(_bridge, b);
}

export function toast(title: string, sub: string, kind?: ToastKind) {
  _bridge.toast(title, sub, kind);
}
export function updateJourney() {
  _bridge.updateJourney();
}
export function closeModal() {
  _bridge.closeModal();
}
