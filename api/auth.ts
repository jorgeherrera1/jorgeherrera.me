// 🏰 GitHub OAuth entry point for the Level Editor (Sveltia CMS at /admin/).
// Deployed by Vercel as a serverless function at /api/auth — the Astro site
// itself stays fully static. Redirects the CMS popup to GitHub's authorize
// screen, carrying a CSRF `state` that is verified in /api/callback.

// No `redirect_uri` is sent: GitHub then falls back to the callback URL
// registered on the OAuth App, so the app settings stay the single source of
// truth and a mismatch (apex vs www, *.vercel.app) can't be introduced here.
// Whatever host GitHub sends the popup back to, Vercel's domain redirect
// lands it on https://www.jorgeherrera.me/api/callback, which is the origin
// the CMS is told to trust (`base_url` in public/admin/config.yml).

export function GET(): Response {
  const clientId = process.env.OAUTH_GITHUB_CLIENT_ID;
  if (!clientId) {
    return new Response('OAUTH_GITHUB_CLIENT_ID is not configured', { status: 500 });
  }

  const state = crypto.randomUUID();
  const params = new URLSearchParams({
    client_id: clientId,
    scope: 'repo',
    state,
  });

  return new Response(null, {
    status: 302,
    headers: {
      Location: `https://github.com/login/oauth/authorize?${params}`,
      'Set-Cookie': `oauth_state=${state}; Path=/api; HttpOnly; Secure; SameSite=Lax; Max-Age=600`,
      'Cache-Control': 'no-store',
    },
  });
}
