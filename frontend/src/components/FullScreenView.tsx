import { useEffect } from 'react';
import { useApp } from '../AppContext';
import { VIEWS } from '../data/views';
import { wbCount } from '../engine/flagships';

const html = (s: string) => ({ __html: s });

export default function FullScreenView() {
  const { currentView, closeView } = useApp();
  const v = currentView ? VIEWS[currentView] : null;

  useEffect(() => {
    if (!currentView) return;
    // mirror the view's onMount (e.g. recompute the workbook approved-count)
    const t = setTimeout(() => {
      if (currentView === 'dp-consensus') wbCount();
    }, 40);
    return () => clearTimeout(t);
  }, [currentView]);

  if (!v) return null;
  return (
    <div className="fsview">
      <div className="fsview-head">
        <button className="fsview-back" onClick={closeView}>← Back to canvas</button>
        <div className="fsview-head-text">
          <div className="fsview-eyebrow" dangerouslySetInnerHTML={html(v.eyebrow)} />
          <div className="fsview-title" dangerouslySetInnerHTML={html(v.title)} />
        </div>
        <div className="fsview-actions" dangerouslySetInnerHTML={html(v.actions || '')} />
      </div>
      <div className="fsview-body" key={currentView} dangerouslySetInnerHTML={html(v.body)} />
    </div>
  );
}
