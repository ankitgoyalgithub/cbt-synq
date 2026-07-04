/* Back4App / Parse connection config.
   Values can be overridden via Vite env vars (frontend/.env), but default to the
   credentials provided for this app so it works out of the box.

   NOTE: this app's Parse Server authenticates the browser SDK via the *Client Key*
   (X-Parse-Client-Key header), not the JavaScript Key — see parse/client.ts. */

const env = ((import.meta as any).env || {}) as Record<string, string | undefined>;

export const PARSE_APP_ID =
  env.VITE_PARSE_APP_ID || 'p0I3hHAOKgnCUt2ZycR4hiOTW2tJwYE3kekU1UvK';

export const PARSE_CLIENT_KEY =
  env.VITE_PARSE_CLIENT_KEY || 'wltXmWRpYnio5EhAIKFqHJkgfAfdyYQiqByqg63u';

export const PARSE_SERVER_URL =
  env.VITE_PARSE_SERVER_URL || 'https://parseapi.back4app.com/';
