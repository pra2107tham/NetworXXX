import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { auth } from '@clerk/nextjs/server';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
    const { userId, sessionClaims } = await auth();
    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const userEmail = sessionClaims?.email;
    if (!userEmail) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { error } = await supabase
        .from('users')
        .update({ 
            linkedin_access_token: null 
        })
        .eq('email', userEmail);

    if (error) {
        return NextResponse.json({ error: 'Error disconnecting LinkedIn' }, { status: 500 });
    }
    return NextResponse.json({ success: true }, { status: 200 });
} 