import { connectToDatabase } from '@/utils/mongodb';

import { Seo, Text } from '../model';

export interface TeamEntity extends Seo {
  name: string;
  banner: string;
  foreignTeam: Team;
  localTeam: Team;
}

export interface Team {
  title: Text;
  description: Text;
  teachers: Teacher[];
}

export interface Teacher {
  title: Text;
  tag: Text;
  description: Text;
  img: string;
  facebook?: string;
  linkedin?: string;
  twitter?: string;
}

// GET /api/team
export async function GET() {
  try {
    const db = await connectToDatabase();
    const team = await db.collection('team').find({}).toArray();
    return Response.json(team, { status: 200 });
  } catch (error) {
    return Response.json(
      { error: 'Failed to fetch team data' },
      { status: 500 }
    );
  }
}

// POST /api/team
export async function POST(req: Request) {
  try {
    const { name, banner, foreignTeam, localTeam } = await req.json();
    if (!name || !banner || !foreignTeam || !localTeam) {
      return Response.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    const db = await connectToDatabase();
    const team = await db.collection('team').insertOne({
      name,
      banner,
      foreignTeam,
      localTeam,
    });
    return Response.json({ team }, { status: 200 });
  } catch (error) {
    return Response.json(
      { error: 'Failed to create team data' },
      { status: 500 }
    );
  }
}
