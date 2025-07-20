import { connectToDatabase } from '@/utils/mongodb';
import { NextRequest } from 'next/server';

// GET /api/newsPage/:name
export async function GET(
  request: NextRequest,
  { params }: { params: { name: string } }
) {
  try {
    const { name } = params;
    const db = await connectToDatabase();
    const data = await db.collection('newsPage').findOne({ name });
    if (!data) {
      return Response.json({ error: 'Data not found' }, { status: 404 });
    }
    return Response.json(data, { status: 200 });
  } catch (error) {
    return Response.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}

// PATCH /api/newsPage/:name
export async function PATCH(
  req: Request,
  { params }: { params: { name: string } }
) {
  try {
    const { name } = params;
    const body = await req.json();
    const db = await connectToDatabase();
    const result = await db
      .collection('newsPage')
      .findOneAndUpdate({ name }, { $set: { ...body } }, {});
    return Response.json(
      { message: 'Data updated successfully', result },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { error: 'Failed to update about data' },
      { status: 500 }
    );
  }
}

// DELETE /api/newsPage/:name
export async function DELETE(
  req: Request,
  { params }: { params: { name: string } }
) {
  try {
    const { name } = params;
    const db = await connectToDatabase();
    const result = await db.collection('newsPage').deleteOne({ name });

    if (result.deletedCount === 0) {
      return Response.json({ error: 'Data not found' }, { status: 404 });
    }
    return Response.json(
      { message: 'Data deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { error: 'Failed to delete about data' },
      { status: 500 }
    );
  }
}
