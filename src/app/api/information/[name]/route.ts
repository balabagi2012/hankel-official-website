import { NextRequest } from 'next/server';

import { connectToDatabase } from '@/utils/mongodb';

// GET /api/information/:name
export async function GET(
  req: NextRequest,
  { params }: { params: { name: string } }
) {
  try {
    const { name } = params;
    const db = await connectToDatabase();
    const information = await db.collection('information').findOne({ name });
    return Response.json(information, { status: 200 });
  } catch (error) {
    return Response.json(
      { error: 'Failed to fetch team data' },
      { status: 500 }
    );
  }
}

// PATCH /api/information/:name
export async function PATCH(
  req: Request,
  { params }: { params: { name: string } }
) {
  try {
    const { name } = params;
    const body = await req.json();
    const db = await connectToDatabase();
    await db.collection('information').updateOne(
      { name },
      {
        $set: {
          ...body,
        },
      },
      { upsert: true }
    );
    return Response.json(
      { message: 'Information data updated successfully' },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { error: 'Failed to update information data' },
      { status: 500 }
    );
  }
}
