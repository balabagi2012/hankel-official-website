import { connectToDatabase } from "@/api/utils/mongodb";

export interface AboutEntity {
  name: string;
  title: string;
  description: string;
  banner: string;
  sections: AboutSection[];
}

export interface AboutSection {
  title?: string;
  texts: AboutSectionText[];
  imgs: string[];
}

export interface AboutSectionText {
  type: "subtitle" | "description";
  content: string;
}

// GET /api/about
export async function GET() {
  try {
    const db = await connectToDatabase();
    const about = await db.collection("about").find({});
    return Response.json({ about }, { status: 200 });
  } catch (error) {
    return Response.json(
      { error: "Failed to fetch about data" },
      { status: 500 }
    );
  }
}

// POST /api/about
export async function POST(req: Request) {
  try {
    const { title, name, description, banner, sections } = await req.json();

    if (!title || !name || !description || !banner || !sections) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const db = await connectToDatabase();

    const about: AboutEntity = {
      name,
      title,
      description,
      banner,
      sections,
    };

    const result = await db.collection("about").insertOne(about);
    return Response.json(result, { status: 201 });
  } catch (error) {
    return Response.json(
      { error: "Failed to create about data" },
      { status: 500 }
    );
  }
}