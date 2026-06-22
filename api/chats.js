export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();

  const password = req.headers['x-admin-password'];
  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const apiKey    = process.env.FIREBASE_API_KEY;

  try {
    // Query Firestore — order by created_at desc
    const response = await fetch(
      `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents:runQuery?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          structuredQuery: {
            from: [{ collectionId: 'conversations' }],
            orderBy: [{ field: { fieldPath: 'created_at' }, direction: 'DESCENDING' }],
            limit: 200,
          },
        }),
      }
    );

    if (!response.ok) {
      const err = await response.text();
      console.error('Firestore fetch error:', err);
      return res.status(502).json({ error: 'Database error' });
    }

    const raw = await response.json();

    // Firestore returns an array; each item has a `document` field
    const chats = raw
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
      });

    return res.status(200).json(chats);
  } catch (err) {
    console.error('chats handler error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
