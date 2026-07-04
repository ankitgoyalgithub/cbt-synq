import { useEffect } from 'react';
import { useApp } from '../AppContext';
import { CELLS, setCurrentCellId } from '../data/cells';
import {
  initSim, initStack, initWaterfall, initRadar, initQcomm, qcStopLoops,
} from '../engine/flagships';

const html = (s: string) => ({ __html: s });

export default function Modal() {
  const { currentCell, closeModal } = useApp();
  const cell = currentCell ? CELLS[currentCell] : null;

  useEffect(() => {
    if (!currentCell) { qcStopLoops(); return; }
    setCurrentCellId(currentCell);
    // initialize the matching flagship once its HTML has mounted
    const t = setTimeout(() => {
      if (currentCell === 'inv-signal') initSim();
      else if (currentCell === 'dp-signal') initStack();
      else if (currentCell === 'csco-why') initWaterfall();
      else if (currentCell === 'csco-signal') initRadar();
      else if (currentCell === 'qcomm-signal') initQcomm();
    }, 40);
    return () => { clearTimeout(t); qcStopLoops(); };
  }, [currentCell]);

  return (
    <>
      <div className={`modal-back${currentCell ? ' open' : ''}`} id="modalBack" onClick={closeModal} />
      <div className={`modal${currentCell ? ' open' : ''}`} id="modal">
        <div className="modal-head">
          <div className="modal-head-left">
            <button className="modal-head-back" onClick={closeModal} title="Back">←</button>
            <div className="modal-head-text">
              <div className="modal-head-eyebrow" id="modalEyebrow" dangerouslySetInnerHTML={html(cell ? cell.eyebrow : '◆ Playbook')} />
              <div className="modal-head-title" id="modalTitle" dangerouslySetInnerHTML={html(cell ? cell.title : 'Title')} />
            </div>
          </div>
          <button className="modal-head-close" onClick={closeModal}>×</button>
        </div>
        <div
          className="modal-body"
          id="modalBody"
          key={currentCell || 'empty'}
          dangerouslySetInnerHTML={html(cell ? cell.body : '')}
        />
      </div>
    </>
  );
}
