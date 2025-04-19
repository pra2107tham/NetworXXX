// app/api/oauth/callback/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { auth } from '@clerk/nextjs/server';

export async function GET(request: Request) {
    try{
        const { userId, sessionClaims } = await auth();
        
        if (!userId) {
            return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/login`);
        }

        // Get user's email from session claims
        const userEmail = sessionClaims?.email;
        
        const { searchParams } = new URL(request.url);
        const code = searchParams.get('code');

        // Exchange authorization code for tokens
        const tokenResponse = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            grant_type: 'authorization_code',
            code: code!,
            client_id: process.env.LINKEDIN_CLIENT_ID!,
            client_secret: process.env.LINKEDIN_CLIENT_SECRET!,
            redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/oauth/callback`,
        }),
        });
        
        const { access_token, expires_in } = await tokenResponse.json();

        const expiresAt = new Date();
        expiresAt.setSeconds(expiresAt.getSeconds() + expires_in);

        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!
        );
        
        // Update user's LinkedIn information in Supabase
        const { data, error } = await supabase
            .from('users') // replace with your actual table name
            .update({
                linkedin_access_token: access_token,
                linkedin_expires_at: expiresAt
            })
            .eq('email', userEmail);

        if (error) {
            console.error('Error updating user in Supabase:', error);
            return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/error`);
        }

        // Redirect to success page or dashboard
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/dashboard`);

    }catch(error){
        console.error('OAuth error:', error);
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/error`);
    }
}