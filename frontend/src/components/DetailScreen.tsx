import { useEffect } from 'react';
import { useApp } from '../AppContext';
import { CELLS, setCurrentCellId } from '../data/cells';
import { VIEWS } from '../data/views';
import {
  initSim, initStack, initWaterfall, initRadar, initQcomm, qcStopLoops, wbCount,
} from '../engine/flagships';

const html = (s: string) => ({ __html: s });

/* One consistent full-screen detail surface for BOTH modal-cells and views —
   so every tile / library card opens the same way, with the same back control. */
export default function DetailScreen() {
  const { currentCell, currentView, closeDetail } = useApp();
  const view = currentView ? VIEWS[currentView] : null;
  const cell = currentCell ? CELLS[currentCell] : null;
  const item = view || cell;
  const id = currentView || currentCell;

  useEffect(() => {
    if (!id) { qcStopLoops(); return; }
    if (currentCell) setCurrentCellId(currentCell);
    const t = setTimeout(() => {
      if (currentCell === 'inv-signal') initSim();
      else if (currentCell === 'dp-signal') initStack();
      else if (currentCell === 'csco-why') initWaterfall();
      else if (currentCell === 'csco-signal') initRadar();
      else if (currentCell === 'qcomm-signal') initQcomm();
      else if (currentView === 'dp-consensus') wbCount();
      else if (currentView === 'dp-forecast' && (window as any).fvFilter) (window as any).fvFilter();
    }, 40);
    return () => { clearTimeout(t); qcStopLoops(); };
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!item) return null;
  return (
    <div className="screen">
      <div className="screen-head">
        <button className="screen-back" onClick={closeDetail} title="Back" aria-label="Back">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="screen-head-text">
          <div className="screen-eyebrow" dangerouslySetInnerHTML={html(item.eyebrow)} />
          <div className="screen-title" dangerouslySetInnerHTML={html(item.title)} />
        </div>
        {view?.actions ? <div className="screen-actions" dangerouslySetInnerHTML={html(view.actions)} /> : null}
      </div>
      <div className="screen-body" key={id} dangerouslySetInnerHTML={html(item.body)} />
    </div>
  );
}
