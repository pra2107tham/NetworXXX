import { Webhook } from 'svix';
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(req) {
  const payload = await req.json();
  const headers = Object.fromEntries(req.headers.entries());
  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

  console.log('Webhook received:', {
    headers: Object.keys(headers),
    payloadType: Object.keys(payload)
  });

  try {
    const event = wh.verify(JSON.stringify(payload), headers);
    const { id, email_addresses, first_name, last_name } = event.data;

    console.log('Webhook verified:', {
      eventType: event.type,
      userId: id
    });

    switch (event.type) {
      case 'user.created':
        console.log('Creating user:', {
          userId: id,
          email: email_addresses[0]?.email_address
        });
        await supabase.from('users').upsert({
          id,
          email: email_addresses[0].email_address,
          name: `${first_name || ''} ${last_name || ''}`.trim(),
          first_name,
          last_name,
          updated_at: new Date().toISOString(),
        });
        console.log('User created successfully:', { userId: id });
        break;

      case 'user.updated':
        console.log('Updating user:', {
          userId: id,
          email: email_addresses[0]?.email_address
        });
        await supabase.from('users').upsert({
          id,
          email: email_addresses[0].email_address,
          name: `${first_name || ''} ${last_name || ''}`.trim(),
          first_name,
          last_name,
          updated_at: new Date().toISOString(),
        });
        console.log('User updated successfully:', { userId: id });
        break;

      case 'user.deleted':
        console.log('Deleting user:', { userId: id });
        await supabase.from('users').delete().eq('id', id);
        console.log('User deleted successfully:', { userId: id });
        break;

      default:
        console.log('Unknown event type:', {
          eventType: event.type,
          userId: id
        });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.log('Webhook error:', {
      error: err.message,
      stack: err.stack
    });
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
