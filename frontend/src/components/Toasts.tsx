import { useApp } from '../AppContext';

export default function Toasts() {
  const { toasts } = useApp();
  return (
    <div className="toast-stack" id="toastStack">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`toast ${t.kind || ''}`}
          style={t.leaving ? { opacity: 0, transform: 'translateX(20px)' } : undefined}
        >
          <div className="toast-title">{t.title}</div>
          <div className="toast-sub">{t.sub}</div>
        </div>
      ))}
    </div>
  );
}
