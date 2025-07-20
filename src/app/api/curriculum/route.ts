import { connectToDatabase } from '@/utils/mongodb';
import { Seo, Text } from '../model';

export interface CurriculumEntity extends Seo {
  name: string;
  banner: string;
  title: Text;
  description: Text;
  curriculumTitle: Text;
  curriculums: Curriculum[];
}

export interface Curriculum {
  img: string;
  title: Text;
  description: Text;
}

// GET /api/curriculum
export async function GET() {
  try {
    const db = await connectToDatabase();
    const curriculum = await db.collection('curriculum').find({}).toArray();
    return Response.json(curriculum, { status: 200 });
  } catch (error) {
    return Response.json(
      { error: 'Failed to fetch curriculum data' },
      { status: 500 }
    );
  }
}

// POST /api/curriculum
export async function POST(req: Request) {
  try {
    const { name, banner, title, description, curriculumTitle, curriculums } =
      await req.json();
    if (!name || !title || !description || !curriculumTitle || !curriculums) {
      return Response.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    const db = await connectToDatabase();
    const curriculum = await db.collection('curriculum').insertOne({
      name,
      banner,
      title,
      description,
      curriculumTitle,
      curriculums,
    });
    return Response.json({ curriculum }, { status: 200 });
  } catch (error) {
    return Response.json(
      { error: 'Failed to create curriculum data' },
      { status: 500 }
    );
  }
}
