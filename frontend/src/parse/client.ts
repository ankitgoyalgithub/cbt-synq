import Parse from 'parse';
import { PARSE_APP_ID, PARSE_CLIENT_KEY, PARSE_SERVER_URL } from './config';

/* ─────────────────────────────────────────────────────────────────────────
   Parse / Back4App client.

   This Back4App app authenticates the browser SDK with its **Client Key**
   (sent as the `X-Parse-Client-Key` HTTP header). The Parse JS SDK only knows
   how to send the App ID + JavaScript/Master keys, so we patch the REST
   controller's `ajax` to attach the client-key header on every request.
   Back4App's CORS config explicitly allows that header.
   ───────────────────────────────────────────────────────────────────────── */

let _initialized = false;

export function initParse(): typeof Parse {
  if (_initialized) return Parse;

  Parse.initialize(PARSE_APP_ID); // App ID only — client key is sent via the header below
  (Parse as any).serverURL = PARSE_SERVER_URL;

  const CoreManager: any = (Parse as any).CoreManager;
  const controller: any = CoreManager.getRESTController();
  if (!controller.__clientKeyPatched) {
    const originalAjax = controller.ajax;
    controller.ajax = function patchedAjax(
      method: string,
      url: string,
      data: any,
      headers: Record<string, string> | undefined,
      options: any,
    ) {
      const hdrs = headers || {};
      hdrs['X-Parse-Client-Key'] = PARSE_CLIENT_KEY;
      return originalAjax.call(this, method, url, data, hdrs, options);
    };
    controller.__clientKeyPatched = true;
    CoreManager.setRESTController(controller);
  }

  _initialized = true;
  return Parse;
}

initParse();

/* ── Auth helpers ─────────────────────────────────────────────────────── */

export function currentUser(): Parse.User | null {
  return Parse.User.current() ?? null;
}

export async function logIn(username: string, password: string): Promise<Parse.User> {
  return Parse.User.logIn(username.trim(), password);
}

export async function signUp(
  username: string,
  password: string,
  email?: string,
): Promise<Parse.User> {
  const user = new Parse.User();
  user.setUsername(username.trim());
  user.setPassword(password);
  if (email) user.setEmail(email.trim());
  return user.signUp();
}

export async function logOut(): Promise<void> {
  await Parse.User.logOut();
}

/* Map Parse errors to friendly copy for the login screen. */
export function authErrorMessage(err: any): string {
  const code = err?.code;
  const map: Record<number, string> = {
    101: 'Invalid username or password.',
    200: 'A username is required.',
    201: 'A password is required.',
    202: 'That username is already taken.',
    203: 'That email is already in use.',
    125: 'Please enter a valid email address.',
    100: 'Cannot reach the server. Check your connection.',
  };
  return (code && map[code]) || err?.message || 'Something went wrong. Please try again.';
}

export default Parse;
