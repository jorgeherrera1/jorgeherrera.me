// 🏰 GitHub OAuth entry point for the Level Editor (Sveltia CMS at /admin/).
// Deployed by Vercel as a serverless function at /api/auth — the Astro site
// itself stays fully static. Redirects the CMS popup to GitHub's authorize
// screen, carrying a CSRF `state` that is verified in /api/callback.

// Pinned rather than derived from request.url: Vercel's function runtime can
// reconstruct the URL with the deployment host (*.vercel.app), which GitHub
// rejects as "redirect_uri not associated with this application". Must match
// the OAuth App's registered callback URL and config.yml's base_url.
const SITE_ORIGIN = 'https://jorgeherrera.me';

export function GET(): Response {
  const clientId = process.env.OAUTH_GITHUB_CLIENT_ID;
  if (!clientId) {
    return new Response('OAUTH_GITHUB_CLIENT_ID is not configured', { status: 500 });
  }

  const state = crypto.randomUUID();
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: `${SITE_ORIGIN}/api/callback`,
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
