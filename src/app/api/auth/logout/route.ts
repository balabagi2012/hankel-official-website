import { createHash } from 'crypto';
import { NextResponse } from 'next/server';

import { connectToDatabase } from '@/utils/mongodb';

// POST /api/auth/logut
export async function POST(req: Request) {
  try {
    const response = NextResponse.json(
      { message: 'Logout successful' },
      {
        status: 200,
      }
    );
    response.cookies.delete({ name: 'isLogin ' });
    return response;
  } catch (error) {
    return Response.json({ error: 'Failed to create logout' }, { status: 500 });
  }
}
