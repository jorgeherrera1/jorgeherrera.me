// 🏰 GitHub OAuth callback for the Level Editor (Sveltia CMS at /admin/).
// Exchanges the authorization code for an access token and completes the
// popup postMessage handshake that Sveltia/Decap CMS expects:
//   popup -> opener: "authorizing:github"
//   opener -> popup: "authorizing:github"
//   popup -> opener: "authorization:github:success:{json}" (or :error:{json})
// Both sides only talk to `origin`, so the token can never be handed to a
// window on another site.

// Pinned rather than derived from request.url (see api/auth.ts): the CMS
// popup handshake must target the real site origin, not the deployment host.
const SITE_ORIGIN = 'https://jorgeherrera.me';

interface TokenResponse {
  access_token?: string;
  error?: string;
  error_description?: string;
}

function handshakePage(origin: string, message: string): Response {
  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Authorizing…</title>
  </head>
  <body>
    <p>Authorizing… this window closes by itself.</p>
    <script>
      (() => {
        const origin = ${JSON.stringify(origin)};
        const message = ${JSON.stringify(message)};
        window.addEventListener('message', (event) => {
          if (event.origin !== origin || event.data !== 'authorizing:github') return;
          window.opener?.postMessage(message, origin);
        }, { once: true });
        window.opener?.postMessage('authorizing:github', origin);
      })();
    </script>
  </body>
</html>`;

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store',
      'Set-Cookie': 'oauth_state=; Path=/api; HttpOnly; Secure; SameSite=Lax; Max-Age=0',
    },
  });
}

export async function GET(request: Request): Promise<Response> {
  const clientId = process.env.OAUTH_GITHUB_CLIENT_ID;
  const clientSecret = process.env.OAUTH_GITHUB_CLIENT_SECRET;
  const { searchParams } = new URL(request.url);

  const fail = (error: string): Response =>
    handshakePage(SITE_ORIGIN, `authorization:github:error:${JSON.stringify({ error })}`);

  if (!clientId || !clientSecret) {
    return fail('OAuth environment variables are not configured');
  }

  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const cookieState = /(?:^|;\s*)oauth_state=([^;]+)/.exec(
    request.headers.get('cookie') ?? '',
  )?.[1];

  if (!code || !state || state !== cookieState) {
    return fail('Invalid OAuth state — start over from /admin/');
  }

  const response = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code }),
  });
  const data = (await response.json()) as TokenResponse;

  if (!response.ok || !data.access_token) {
    return fail(data.error_description ?? data.error ?? 'Token exchange failed');
  }

  return handshakePage(
    SITE_ORIGIN,
    `authorization:github:success:${JSON.stringify({ provider: 'github', token: data.access_token })}`,
  );
}
