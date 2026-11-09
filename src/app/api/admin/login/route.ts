import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { z } from 'zod';

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = LoginSchema.parse(body);

    const configuredEmail = process.env.ADMIN_EMAIL || 'admin@thanmaycollections.com';
    const configuredPassword = process.env.ADMIN_INITIAL_PASSWORD || 'ThanmayLuxury2026!';

    if (email !== configuredEmail || password !== configuredPassword) {
      return NextResponse.json(
        { success: false, message: 'Invalid administrative credentials' },
        { status: 401 }
      );
    }

    // Set secure authentication cookie
    const cookieStore = cookies();
    cookieStore.set('thanmay_admin_token', 'admin_authenticated_session_valid', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24, // 24 hours
    });

    return NextResponse.json({
      success: true,
      user: { email, role: 'super_admin' },
    });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: error.errors[0]?.message },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: 'Authentication error' },
      { status: 500 }
    );
  }
}
