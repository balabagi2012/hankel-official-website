import { connectToDatabase } from '@/utils/mongodb';
import { createHash } from 'crypto';
import { NextResponse } from 'next/server';

const encrypt = (algorithm: string, content: string) => {
  const hash = createHash(algorithm);
  hash.update(content);
  return hash.digest('hex');
};

const sha256 = (content: string) => encrypt('sha256', content);

// POST /api/auth/login
export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    const db = await connectToDatabase();
    const user = await db
      .collection('user')
      .find({
        email,
        password: sha256(password),
      })
      .toArray();
    if (!user || user.length == 0) {
      return Response.json({ error: 'Invalid credentials' }, { status: 401 });
    }
    const response = NextResponse.json(
      { message: 'Login successful' },
      {
        status: 200,
      }
    );
    response.cookies.set({ name: 'isLogin ', value: 'true', maxAge: 60 * 60 });
    return response;
  } catch (error) {
    return Response.json(
      { error: 'Failed to create about data' },
      { status: 500 }
    );
  }
}
