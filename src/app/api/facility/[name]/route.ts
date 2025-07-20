import { NextRequest } from 'next/server';

import { connectToDatabase } from '@/utils/mongodb';

// GET /api/facility/:name
export async function GET(
  req: NextRequest,
  { params }: { params: { name: string } }
) {
  try {
    const { name } = params;
    const db = await connectToDatabase();
    const facility = await db.collection('facility').findOne({ name });
    return Response.json(facility, { status: 200 });
  } catch (error) {
    return Response.json(
      { error: 'Failed to fetch facility data' },
      { status: 500 }
    );
  }
}

// PATCH /api/facility/:name
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
    await db.collection('facility').updateOne(
      { name },
      {
        $set: {
          ...body,
        },
      },
      { upsert: true }
    );
    return Response.json(
      { message: 'Facility data updated successfully' },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { error: 'Failed to update facility data' },
      { status: 500 }
    );
  }
}

// DELETE /api/facility/:name
export async function DELETE(
  req: Request,
  { params }: { params: { name: string } }
) {
  try {
    const { name } = params;
    const db = await connectToDatabase();
    const result = await db.collection('facility').deleteOne({ name });

    if (result.deletedCount === 0) {
      return Response.json(
        { error: 'Facility data not found' },
        { status: 404 }
      );
    }
    return Response.json(
      { message: 'Facility data deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { error: 'Failed to delete facility data' },
      { status: 500 }
    );
  }
}
