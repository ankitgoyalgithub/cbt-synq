import { AuthProvider, useAuth } from './auth/AuthContext';
import { AppProvider, useApp } from './AppContext';
import LoginPage from './components/LoginPage';
import AppHeader from './components/AppHeader';
import Sidebar from './components/Sidebar';
import PersonaMain from './components/PersonaMain';
import AskWidget from './components/AskWidget';
import Toasts from './components/Toasts';

function Shell() {
  const { sidebarCollapsed, toggleSidebar } = useApp();
  return (
    <>
      <AppHeader />
      <div className={`app-shell${sidebarCollapsed ? ' sb-collapsed' : ''}`}>
        <Sidebar />
        <div className="content-area">
          <main className="app-main" id="appMain">
            <PersonaMain />
          </main>
        </div>
        <button
          className="sb-edge"
          onClick={toggleSidebar}
          title={sidebarCollapsed ? 'Expand menu' : 'Collapse menu'}
          aria-label={sidebarCollapsed ? 'Expand menu' : 'Collapse menu'}
        >
          {sidebarCollapsed ? '›' : '‹'}
        </button>
      </div>
      <AskWidget />
      <Toasts />
    </>
  );
}

export function Cockpit() {
  return (
    <AppProvider>
      <Shell />
    </AppProvider>
  );
}

function Gate() {
  const { ready, user } = useAuth();
  if (!ready) {
    return (
      <div className="auth-loading"><span className="live-dot" />Connecting to Back4App…</div>
    );
  }
  return user ? <Cockpit /> : <LoginPage />;
}

export default function App() {
  return (
    <AuthProvider>
      <Gate />
    </AuthProvider>
  );
}
