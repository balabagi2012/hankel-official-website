import { connectToDatabase } from '@/utils/mongodb';
import { NextRequest } from 'next/server';

// GET /api/curriculum/:name
export async function GET(
  req: NextRequest,
  { params }: { params: { name: string } }
) {
  try {
    const { name } = params;
    const db = await connectToDatabase();
    const curriculum = await db.collection('curriculum').findOne({ name });
    return Response.json(curriculum, { status: 200 });
  } catch (error) {
    return Response.json(
      { error: 'Failed to fetch curriculum data' },
      { status: 500 }
    );
  }
}

// PATCH /api/curriculum/:name
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
    await db.collection('curriculum').updateOne(
      { name },
      {
        $set: {
          ...body,
        },
      },
      { upsert: true }
    );
    return Response.json(
      { message: 'Curriculum data updated successfully' },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { error: 'Failed to update curriculum data' },
      { status: 500 }
    );
  }
}

// DELETE /api/curriculum/:name
export async function DELETE(
  req: Request,
  { params }: { params: { name: string } }
) {
  try {
    const { name } = params;
    const db = await connectToDatabase();
    await db.collection('curriculum').deleteOne({ name });
    return Response.json(
      { message: 'Curriculum data deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { error: 'Failed to delete curriculum data' },
      { status: 500 }
    );
  }
}
