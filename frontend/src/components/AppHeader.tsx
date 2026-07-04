import { useApp } from '../AppContext';
import PersonaShelf from './PersonaShelf';

export default function AppHeader() {
  const { navHome } = useApp();
  return (
    <header className="app-head">
      <div className="app-head-inner">
        <div className="brand" onClick={navHome}>
          <div className="brand-mark">C</div>
          <div className="brand-text">
            <div className="brand-name">CalvinBall <em>Supply Chain Intelligence</em></div>
            <div className="brand-sub">Aurion Consumer Brands · v0.9</div>
          </div>
        </div>
        <div className="head-right">
          <PersonaShelf />
        </div>
      </div>
    </header>
  );
}
