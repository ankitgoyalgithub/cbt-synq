import { Fragment } from 'react';
import { useApp } from '../AppContext';

const STEPS = [
  { n: 1, label: 'See the risk', title: 'See the morning brief' },
  { n: 2, label: 'Why is it happening', title: 'Open the Why · root cause' },
  { n: 3, label: 'Simulate a fix', title: 'Open the simulator' },
  { n: 4, label: 'Approve & track', title: 'Approve in the simulator' },
];

export default function JourneyRail() {
  const { step, gotoStep } = useApp();
  return (
    <div className="journey-rail" id="journeyRail">
      {STEPS.map((s, i) => (
        <Fragment key={s.n}>
          <div
            className={`journey-step${s.n === step ? ' active' : ''}${s.n < step ? ' done' : ''}`}
            data-step={s.n}
            onClick={() => gotoStep(s.n)}
            title={s.title}
          >
            <span className="journey-step-num" data-num={s.n} />
            {s.label}
          </div>
          {i < STEPS.length - 1 && <div className="journey-arrow" />}
        </Fragment>
      ))}
    </div>
  );
}
