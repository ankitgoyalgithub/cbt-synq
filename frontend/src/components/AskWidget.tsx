import { useEffect, useRef, useState } from 'react';
import { useApp } from '../AppContext';
import { PERSONAS } from '../data/personas';

const html = (s: string) => ({ __html: s });
const personaTitle = (p: any) => p.role.split('·')[0].trim();

export default function AskWidget() {
  const { persona, askOpen, askMessages, toggleAsk, askSubmit, askSugg } = useApp();
  const [draft, setDraft] = useState('');
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const p = PERSONAS[persona];

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [askMessages]);

  useEffect(() => {
    if (askOpen) setTimeout(() => inputRef.current?.focus(), 200);
  }, [askOpen]);

  const submit = () => { askSubmit(draft); setDraft(''); };

  return (
    <>
      <div className={`ask-panel${askOpen ? ' open' : ''}`} id="askPanel">
        <div className="ask-panel-head">
          <div className="ask-panel-icon">A</div>
          <div className="ask-panel-text">
            <div className="ask-panel-title" id="askTitle">Ask CalvinBall</div>
            <div className="ask-panel-sub" id="askSub">Context: {personaTitle(p)} view · Aurion</div>
          </div>
        </div>
        <div className="ask-panel-body" id="askBody" ref={bodyRef}>
          {askMessages.map((m) => {
            if (m.role === 'you') return <div key={m.id} className="ask-msg you">{m.html}</div>;
            const inner = m.label ? `<div class="ai-lbl">${m.label}</div>${m.html}` : m.html;
            return <div key={m.id} className="ask-msg ai" dangerouslySetInnerHTML={html(inner)} />;
          })}
        </div>
        <div className="ask-suggs" id="askSuggs">
          <div className="ask-sugg-lbl">Try asking</div>
          {(p.askSuggs || []).map((s: string, i: number) => (
            <button key={i} className="ask-sugg" onClick={() => askSugg(s)}>{s}</button>
          ))}
        </div>
        <div className="ask-input-row">
          <input
            className="ask-input"
            id="askInput"
            placeholder="Ask anything…"
            value={draft}
            ref={inputRef}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') submit(); }}
          />
          <button className="ask-send" onClick={submit}>↑</button>
        </div>
      </div>
      <button className={`ask-fab${askOpen ? ' open' : ''}`} id="askFab" onClick={toggleAsk} title="Ask CalvinBall">
        A
      </button>
    </>
  );
}
