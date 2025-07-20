import { NextRequest } from 'next/server';

import { connectToDatabase } from '@/utils/mongodb';

// GET /api/team/:name
export async function GET(
  req: NextRequest,
  { params }: { params: { name: string } }
) {
  try {
    const { name } = params;
    const db = await connectToDatabase();
    const team = await db.collection('team').findOne({ name });
    return Response.json(team, { status: 200 });
  } catch (error) {
    return Response.json(
      { error: 'Failed to fetch team data' },
      { status: 500 }
    );
  }
}

// PATCH /api/team/:name
export async function PATCH(
  req: Request,
  { params }: { params: { name: string } }
) {
  try {
    const { name } = params;
    const body = await req.json();
    if (!body.name) {
      return Response.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const db = await connectToDatabase();
    await db.collection('team').updateOne(
      { name },
      {
        $set: {
          ...body,
        },
      },
      { upsert: true }
    );
    return Response.json(
      { message: 'Team data updated successfully' },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { error: 'Failed to update team data' },
      { status: 500 }
    );
  }
}
