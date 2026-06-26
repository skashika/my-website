const VCARD = `BEGIN:VCARD
VERSION:3.0
FN:Shubham Kashikar
TITLE:Senior Software Developer / Tech Lead
EMAIL:shubham@robotaisolutions.com
ADR:;;United States;;;;
URL:https://shubhamkashikar.com
NOTE:Full-stack software developer and technical lead with 8+ years of experience.
END:VCARD`;

export default async function handler(req, res) {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const apiKey    = process.env.FIREBASE_API_KEY;

  // Await the Firestore write so Vercel doesn't terminate before it completes
  if (projectId && apiKey) {
    try {
      const logRes = await fetch(
        `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/qr_scans?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            fields: {
              scanned_at: { stringValue: new Date().toISOString() },
              user_agent: { stringValue: req.headers['user-agent'] ?? '' },
            },
          }),
        }
      );
      if (!logRes.ok) {
        const err = await logRes.text();
        console.error('QR scan log error:', err);
      }
    } catch (err) {
      console.error('QR scan log exception:', err);
    }
  }

  // Serve the vCard file so phone prompts to save contact
  res.setHeader('Content-Type', 'text/vcard; charset=utf-8');
  res.setHeader('Content-Disposition', 'attachment; filename="Shubham_Kashikar.vcf"');
  res.status(200).send(VCARD);
}
