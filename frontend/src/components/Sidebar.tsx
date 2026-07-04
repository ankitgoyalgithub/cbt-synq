import { useApp } from '../AppContext';
import { useAuth } from '../auth/AuthContext';
import { SB_NAV } from '../data/personas';

export default function Sidebar() {
  const { persona, currentCell, currentView, goTo, theme, toggleTheme, sidebarCollapsed } = useApp();
  const { user, logout } = useAuth();
  const collapsed = sidebarCollapsed;
  const nav = SB_NAV[persona] || [];

  return (
    <aside className={`sidebar${collapsed ? ' collapsed' : ''}`} id="sidebar">
      <nav className="sb-section sb-nav">
        {nav.map((n: any) => {
          const isActive = currentCell === n.id || currentView === n.id
            || (n.id === 'home' && !currentCell && !currentView);
          return (
            <div
              key={n.id}
              className={`sb-link${isActive ? ' active' : ''}`}
              onClick={() => goTo(n.id)}
              title={n.name}
            >
              <span className="sb-link-icon">{n.icon}</span>
              <span className="sb-link-text">{n.name}</span>
            </div>
          );
        })}
      </nav>

      <div className="sb-foot">
        <div className="sb-link" onClick={toggleTheme} title={theme === 'light' ? 'Switch to dark' : 'Switch to light'}>
          <span className="sb-link-icon">{theme === 'light' ? '☾' : '◐'}</span>
          <span className="sb-link-text">{theme === 'light' ? 'Dark theme' : 'Light theme'}</span>
        </div>
        <div className="sb-link" onClick={() => { void logout(); }} title="Log Out">
          <span className="sb-link-icon">⤓</span><span className="sb-link-text">Log Out</span>
        </div>
        <div className="sb-link" title="User Guide">
          <span className="sb-link-icon">?</span><span className="sb-link-text">User Guide</span>
        </div>
        {user && !collapsed && (
          <div className="sb-user" title={`Signed in as ${user.getUsername?.() || ''}`}>
            <span className="live-dot" />Signed in as&nbsp;<strong>{user.getUsername?.() || 'user'}</strong>
          </div>
        )}
        <div className="sb-brand">
          <div className="sb-brand-mark">C</div>
          <div className="sb-brand-tag">by CalvinBall Technologies</div>
        </div>
      </div>
    </aside>
  );
}
