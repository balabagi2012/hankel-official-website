import dayjs from 'dayjs';

import { connectToDatabase } from '@/utils/mongodb';

import { Seo, Text } from '../model';

export interface EventEntity extends Seo {
  _id?: string;
  title: Text;
  category: string;
  date: string;
  updatedAt: number;
}

// GET /api/event
export async function GET(req: Request) {
  try {
    const db = await connectToDatabase();
    const filter: any = {};
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.search);

    if (searchParams.has('category')) {
      filter.category = searchParams.get('category');
    }

    if (searchParams.has('date')) {
      const date = dayjs(searchParams.get('date'));
      filter.date = {
        $gte: date.startOf('month').toDate().toISOString(),
        $lte: date.endOf('month').toDate().toISOString(),
      };
    }

    let limit = 16;

    if (searchParams.has('limit')) {
      limit = parseInt(searchParams?.get('limit') ?? '16', 10);
    }

    const events = await db
      .collection('event')
      .find(filter)
      .sort({ updatedAt: -1 })
      .limit(limit)
      .toArray();
    if (!events) {
      return Response.json({ error: 'Event data not found' }, { status: 404 });
    }
    return Response.json(events, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        error: 'Failed to fetch event data',
        errorMessage: (error as Error).message,
      },
      { status: 500 }
    );
  }
}

// POST /api/event
export async function POST(req: Request) {
  try {
    const { title, date, category } = await req.json();
    if (!title || !category || !date) {
      return Response.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    const db = await connectToDatabase();
    const event = await db.collection('event').insertOne({
      title,
      category,
      date: new Date(date).toISOString(),
      updatedAt: new Date().getTime(),
    });
    return Response.json(event, { status: 201 });
  } catch (error) {
    return Response.json(
      {
        error: 'Failed to create event data',
        errorMessage: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
