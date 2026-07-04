import { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { authErrorMessage } from '../parse/client';

type Mode = 'login' | 'signup';

export default function LoginPage() {
  const { login, register } = useAuth();
  const [mode, setMode] = useState<Mode>('login');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!username.trim() || !password) {
      setError('Please enter a username and password.');
      return;
    }
    setBusy(true);
    try {
      if (mode === 'login') await login(username, password);
      else await register(username, password, email || undefined);
      // on success the AuthProvider re-renders into the app
    } catch (err) {
      setError(authErrorMessage(err));
      setBusy(false);
    }
  };

  return (
    <div className="auth-screen">
      <div className="auth-card">
        <div className="auth-brand">
          <div className="brand-mark">C</div>
          <div className="brand-text">
            <div className="brand-name">CalvinBall <em>Supply Chain Intelligence</em></div>
            <div className="brand-sub">Aurion Consumer Brands · v0.3</div>
          </div>
        </div>

        <div className="auth-head">
          <div className="auth-eyebrow">
            <span className="live-dot" />Secure access · Back4App
          </div>
          <h1 className="auth-title">
            {mode === 'login' ? <>Welcome <em>back</em>.</> : <>Create your <em>account</em>.</>}
          </h1>
          <p className="auth-sub">
            {mode === 'login'
              ? 'Sign in to your CalvinBall cockpit to triage today’s signals.'
              : 'Set up your credentials to access the CalvinBall cockpit.'}
          </p>
        </div>

        <form className="auth-form" onSubmit={submit}>
          <label className="auth-field">
            <span className="auth-label">Username</span>
            <input
              className="auth-input"
              type="text"
              autoComplete="username"
              placeholder="vikram.mehta"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
            />
          </label>

          {mode === 'signup' && (
            <label className="auth-field">
              <span className="auth-label">Email <span className="auth-optional">(optional)</span></span>
              <input
                className="auth-input"
                type="email"
                autoComplete="email"
                placeholder="you@aurion.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          )}

          <label className="auth-field">
            <span className="auth-label">Password</span>
            <input
              className="auth-input"
              type="password"
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          {error && <div className="auth-error">{error}</div>}

          <button className="btn btn-primary auth-submit" type="submit" disabled={busy}>
            {busy ? 'Please wait…' : mode === 'login' ? '◆ Sign in' : '◆ Create account'}
          </button>
        </form>

        <div className="auth-toggle">
          {mode === 'login' ? (
            <>New to CalvinBall?{' '}
              <button type="button" onClick={() => { setMode('signup'); setError(''); }}>Create an account</button>
            </>
          ) : (
            <>Already have an account?{' '}
              <button type="button" onClick={() => { setMode('login'); setError(''); }}>Sign in</button>
            </>
          )}
        </div>

        <div className="auth-foot">
          <span className="auth-foot-dot" />Connected to Back4App · Parse
        </div>
      </div>
    </div>
  );
}
