export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { userMessage, botReply, messages } = req.body;
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const apiKey    = process.env.FIREBASE_API_KEY;

  try {
    const doc = {
      fields: {
        user_message: { stringValue: userMessage ?? '' },
        bot_reply:    { stringValue: botReply ?? '' },
        messages:     { stringValue: JSON.stringify(messages ?? []) },
        created_at:   { stringValue: new Date().toISOString() },
      },
    };

    await fetch(
      `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/conversations?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(doc),
      }
    );
  } catch (err) {
    console.error('log-chat error:', err);
  }

  return res.status(200).end();
}
