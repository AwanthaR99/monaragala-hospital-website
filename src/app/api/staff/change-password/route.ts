// src/app/api/staff/change-password/route.ts
import { client } from '@/lib/sanityClient';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { authOptions } from '@/lib/auth';

export async function POST(request: Request) {
  const session = await getServerSession(authOptions); 

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  try {
    const { newPassword } = await request.json();
    if (!newPassword || newPassword.length < 6) {
        return NextResponse.json({ error: 'Password must be at least 6 characters long' }, { status: 400 });
    }
    
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const query = `*[_type == "staffMember" && email == $email][0]{_id}`;
    const user = await client.fetch(query, { email: session.user.email });

    if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    await client
      .patch(user._id)
      .set({ 
        password: hashedPassword,
        hasChangedInitialPassword: true 
      })
      .commit();

    return NextResponse.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error("Error updating password:", error);
    return NextResponse.json({ error: 'An error occurred while updating password' }, { status: 500 });
  }
}