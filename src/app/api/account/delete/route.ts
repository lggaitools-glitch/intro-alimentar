import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { getSupabaseServerClient } from '@/lib/supabase/server';

export async function POST() {
  try {
    const supabase = await getSupabaseServerClient();
    if (!supabase) {
      return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 });
    }

    // Get the current user from the session
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // Use service role key to delete the auth user
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;

    if (!serviceKey || !url) {
      // No service role key — data was already deleted client-side,
      // but we can't delete the auth user. Return partial success.
      return NextResponse.json({ partial: true, message: 'Data deleted, auth user requires manual deletion' }, { status: 200 });
    }

    // Create admin client with service role key
    const adminClient = createClient(url, serviceKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    // Delete the auth user (CASCADE will clean up any remaining data)
    const { error } = await adminClient.auth.admin.deleteUser(user.id);

    if (error) {
      console.error('Admin delete user error:', error);
      return NextResponse.json({ error: 'Failed to delete auth user' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Account deletion error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
