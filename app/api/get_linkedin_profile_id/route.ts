import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const vanityName = searchParams.get('vanity_name');

    if (!vanityName) {
      return NextResponse.json(
        { error: 'LinkedIn ID is required' },
        { status: 400 }
      );
    }

    const response = await fetch(
      `https://api.lix-it.com/v1/person/ids?li_flagship_id=${vanityName}`,
      {
        headers: {
          Authorization: `${process.env.LIX_API_KEY}`,
        },
      }
    );

    if (!response.ok) {
      console.log(response);  
      throw new Error('Failed to fetch profile ID');
    }

    const data = await response.json();
    const profileId = data.person_ids.liID;

    return NextResponse.json({ profile_id: profileId });
  } catch (error) {
    console.error('Error fetching profile ID:', error);
    return NextResponse.json(
      { error: 'Failed to fetch profile ID', data: error },
      { status: 500 }
    );
  }
}
