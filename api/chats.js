export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();

  const password = req.headers['x-admin-password'];
  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const apiKey    = process.env.FIREBASE_API_KEY;

  try {
    const query = (collectionId, limit) =>
      fetch(
        `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents:runQuery?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            structuredQuery: { from: [{ collectionId }], limit },
          }),
        }
      );

    const [convRes, qrRes, arsRes] = await Promise.all([
      query('conversations', 200),
      query('qr_scans', 1000),
      query('ars_clicks', 1000),
    ]);

    if (!convRes.ok) {
      const err = await convRes.text();
      console.error('Firestore conversations error:', err);
      return res.status(502).json({ error: 'Database error' });
    }

    const rawConv = await convRes.json();
    const rawQR   = qrRes.ok  ? await qrRes.json()  : [];
    const rawARS  = arsRes.ok ? await arsRes.json() : [];

    const chats = rawConv
      .filter(r => r.document)
      .map(r => {
        const f = r.document.fields;
        return {
          id:           r.document.name,
          created_at:   f.created_at?.stringValue ?? f.updated_at?.stringValue ?? '',
          user_message: f.user_message?.stringValue ?? '',
          bot_reply:    f.bot_reply?.stringValue ?? '',
          messages:     JSON.parse(f.messages?.stringValue ?? '[]'),
        };
      })
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    const qrScans = rawQR
      .filter(r => r.document)
      .map(r => ({ scanned_at: r.document.fields?.scanned_at?.stringValue ?? '' }))
      .sort((a, b) => new Date(b.scanned_at) - new Date(a.scanned_at));

    const arsClicks = rawARS
      .filter(r => r.document)
      .map(r => ({ clicked_at: r.document.fields?.clicked_at?.stringValue ?? '' }))
      .sort((a, b) => new Date(b.clicked_at) - new Date(a.clicked_at));

    return res.status(200).json({ chats, qrScans, arsClicks });
  } catch (err) {
    console.error('chats handler error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
