import { ObjectId } from 'mongodb';
import { NextRequest } from 'next/server';

import { connectToDatabase } from '@/utils/mongodb';

// GET /api/event/:id
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const db = await connectToDatabase();
    const event = await db
      .collection('event')
      .findOne({ _id: new ObjectId(id) });
    return Response.json(event, { status: 200 });
  } catch (error) {
    return Response.json(
      { error: 'Failed to fetch news data' },
      { status: 500 }
    );
  }
}

// PATCH /api/event/:id
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await req.json();
    const db = await connectToDatabase();
    await db.collection('event').updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...body,
          updatedAt: new Date().getTime(),
        },
      },
      { upsert: true }
    );
    return Response.json(
      { message: 'Event data updated successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      { error: 'Failed to update Event data' },
      { status: 500 }
    );
  }
}

// DELETE /api/event/:id
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const db = await connectToDatabase();
    await db.collection('event').deleteOne({ _id: new ObjectId(id) });
    return Response.json(
      { message: 'Event data deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      { error: 'Failed to delete Event data' },
      { status: 500 }
    );
  }
}
