export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const apiKey    = process.env.FIREBASE_API_KEY;

  if (projectId && apiKey) {
    try {
      const logRes = await fetch(
        `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/ars_clicks?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            fields: {
              clicked_at: { stringValue: new Date().toISOString() },
              user_agent: { stringValue: req.headers['user-agent'] ?? '' },
              referrer:   { stringValue: req.headers['referer'] ?? '' },
            },
          }),
        }
      );
      if (!logRes.ok) {
        const err = await logRes.text();
        console.error('ARS click log error:', err);
      }
    } catch (err) {
      console.error('ARS click log exception:', err);
    }
  }

  return res.status(200).end();
}
