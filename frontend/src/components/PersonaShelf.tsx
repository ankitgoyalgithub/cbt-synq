import { useApp } from '../AppContext';

interface Card { key: string; av: string; name: string; role: string }

const CARDS: Card[] = [
  { key: 'csco', av: 'VM', name: 'Vikram Mehta', role: 'Chief Supply Chain Officer' },
  { key: 'dp', av: 'AS', name: 'Anjali Sharma', role: 'Head of Demand Planning' },
  { key: 'inv', av: 'RK', name: 'Rajiv Kumar', role: 'Inventory Risk Manager' },
  { key: 'qcomm', av: 'PN', name: 'Priya Nair', role: 'Q-Commerce & Modern Trade' },
];

/* Compact "Viewing as" persona switcher — top-right of the header.
   Active persona shown as name + role, followed by four equal avatar circles. */
export default function PersonaShelf() {
  const { persona, switchPersona } = useApp();
  const active = CARDS.find((c) => c.key === persona) || CARDS[0];
  return (
    <div className="persona-switch">
      <div className="persona-switch-id">
        <div className="persona-switch-name">{active.name}</div>
        <div className="persona-switch-role">{active.role}</div>
      </div>
      <div className="persona-avatars">
        {CARDS.map((c) => (
          <button
            key={c.key}
            className={`persona-av${persona === c.key ? ' active' : ''}`}
            data-persona={c.key}
            onClick={() => switchPersona(c.key)}
            title={`${c.name} · ${c.role}`}
            aria-pressed={persona === c.key}
          >
            {c.av}
          </button>
        ))}
      </div>
    </div>
  );
}
