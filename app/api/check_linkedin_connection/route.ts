import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { auth } from '@clerk/nextjs/server';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: NextRequest) {
    const { userId, sessionClaims } = await auth();
    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const userEmail = sessionClaims?.email;
    if (!userEmail) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const { data, error } = await supabase
        .from('users')
        .select(' linkedin_access_token')
        .eq('email', userEmail)
        .single();

    if (error) {
        return NextResponse.json({ error: 'Error fetching user data', data: error }, { status: 500 });
    }
    return NextResponse.json({ 
        linkedin_access_token: data.linkedin_access_token }, 
        { status: 200 });
}