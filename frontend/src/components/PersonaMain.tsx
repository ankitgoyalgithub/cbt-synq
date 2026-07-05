import { useApp } from '../AppContext';
import { PERSONAS } from '../data/personas';
import { HERO_TILES, LIBRARY } from '../data/content';
import DetailScreen from './DetailScreen';

const html = (s: string) => ({ __html: s });

export default function PersonaMain() {
  const { persona, currentCell, currentView, toggleAsk, openCell, drillStat, drillMini } = useApp();
  const p = PERSONAS[persona];

  // any drill-down (cell or view) opens as a consistent full-screen page
  if (currentCell || currentView) return <DetailScreen />;

  return (
    <>
      <section className="hero">
        <div className="hero-left">
          <div className="hero-eyebrow">
            <span className="live-dot" />{p.eyebrow}
          </div>
          <h1 className="hero-title" dangerouslySetInnerHTML={html(p.title)} />
          <p className="hero-sub" dangerouslySetInnerHTML={html(p.sub)} />
          <div className="hero-actions">
            <button className="btn btn-primary" onClick={toggleAsk}>◆ Ask CalvinBall</button>
            <button className="btn btn-ghost" onClick={() => openCell(`${persona}-brief`)}>
              Open this morning&apos;s brief →
            </button>
          </div>
        </div>
        <aside
          className={`hero-right ${p.severity === 'warn' ? 'warn' : ''}`}
          onClick={() => drillStat(persona, `${persona}-why`)}
        >
          <div className="hero-right-eyebrow">
            <span className="hero-right-pulse" />
            {p.severity === 'warn' ? 'Watch · trending' : 'Decide today'}
          </div>
          <div className="hero-right-val" dangerouslySetInnerHTML={html(p.bigVal)} />
          <div className="hero-right-lbl" dangerouslySetInnerHTML={html(p.bigLbl)} />
          <div className="hero-right-foot">
            {p.bigMini.map((m: any, i: number) => (
              <div
                key={i}
                className="hero-right-mini"
                onClick={(e) => { e.stopPropagation(); drillMini(persona, i); }}
              >
                <div className="hero-right-mini-val">{m.v}</div>
                <div className="hero-right-mini-lbl">{m.l}</div>
              </div>
            ))}
          </div>
        </aside>
      </section>

      {/* Hero tiles + secondary library — rendered from the ported content strings;
          their inline onclick handlers resolve against the window bridges. */}
      <div dangerouslySetInnerHTML={html(HERO_TILES[persona] || '')} />
      <div dangerouslySetInnerHTML={html(LIBRARY[persona] || '')} />
    </>
  );
}
