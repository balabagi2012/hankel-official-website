import { connectToDatabase } from "@/utils/mongodb";

import { Seo, Text } from "../model";

export interface AboutEntity extends Seo {
  name: string;
  title: Text;
  description: Text;
  banner: string;
  sections: AboutSection[];
}

export interface AboutSection {
  title?: Text;
  texts: AboutSectionText[];
  imgs: string[];
}

export interface AboutSectionText {
  type: "subtitle" | "description";
  content: Text;
}

// GET /api/about
export async function GET() {
  try {
    const db = await connectToDatabase();
    const about = await db.collection("about").find({}).toArray();
    return Response.json(about, { status: 200 });
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
    const { name, title, description, banner, sections } = await req.json();
    if (!name || !title || !description || !banner || !sections) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    const db = await connectToDatabase();
    await db.collection("about").insertOne({
      name,
      title,
      description,
      banner,
      sections,
    });
    return Response.json(
      { message: "About data created successfully" },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { error: "Failed to create about data" },
      { status: 500 }
    );
  }
}
