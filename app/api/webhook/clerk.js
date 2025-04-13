// app/api/webhook/clerk.js
import { Webhook } from 'svix';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  const payload = await req.json();
  const headers = req.headers;
  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

  try {
    const event = wh.verify(JSON.stringify(payload), headers);
    const { id, email_addresses, first_name, last_name } = event.data;

    switch (event.type) {
      case 'user.created':
      case 'user.updated':
        await supabase.from('users').upsert({
          id,
          email: email_addresses[0].email_address,
          name: `${first_name || ''} ${last_name || ''}`.trim(),
          first_name,
          last_name,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'id'
        });
        break;

      case 'user.deleted':
        await supabase.from('users').delete().eq('id', id);
        break;
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Webhook processing failed:', err);
    return res.status(400).json({ error: 'Invalid request' });
  }
}
