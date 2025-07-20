import { NextRequest } from 'next/server';

import { connectToDatabase } from '@/utils/mongodb';

import { Seo, Text } from '../model';

export interface SubschoolEntity extends Seo {
  name: string;
  title: Text;
  description: Text;
  banner: string;
  socialMedia: {
    facebook: string;
    instagram: string;
    instagramExpireTime: number;
  };
  experiences: {
    title: Text;
    description: Text;
    img: string;
  }[];
  subBanner: SubBanner;
}

export interface SubBanner {
  title: Text;
  description: Text;
  img: string;
}

// GET /api/subschool/
export async function GET(request: NextRequest) {
  try {
    const db = await connectToDatabase();
    const subschool = await db.collection('subschool').find({}).toArray();
    if (!subschool) {
      return Response.json(
        { error: 'Subschool data not found' },
        { status: 404 }
      );
    }
    return Response.json(subschool, { status: 200 });
  } catch (error) {
    return Response.json(
      {
        error: 'Failed to fetch subschool data',
        errorMessage: (error as Error).message,
      },
      { status: 500 }
    );
  }
}

// POST /api/subschool
export async function POST(req: Request) {
  try {
    const {
      name,
      title,
      description,
      banner,
      socialMedia,
      experiences,
      subBanner,
    } = await req.json();
    if (
      !name ||
      !title ||
      !description ||
      !banner ||
      !socialMedia ||
      !experiences ||
      !subBanner
    ) {
      return Response.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    const db = await connectToDatabase();
    await db.collection('subschool').insertOne({
      name,
      title,
      description,
      banner,
      socialMedia,
      experiences,
      subBanner,
    });
    return Response.json(
      { message: 'Subschool data created successfully' },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { error: 'Failed to create subschool data' },
      { status: 500 }
    );
  }
}
