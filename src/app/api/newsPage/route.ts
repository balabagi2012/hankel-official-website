import { connectToDatabase } from "@/utils/mongodb";

import { Seo, Text } from "../model";

export interface NewsPageEntity extends Seo {
  name: string;
  title: Text;
  description: Text;
  banner: string;
}

// GET /api/newsPage
export async function GET() {
  try {
    const db = await connectToDatabase();
    const about = await db.collection("newsPage").find({}).toArray();
    return Response.json(about, { status: 200 });
  } catch (error) {
    return Response.json(
      { error: "Failed to fetch newsPage data" },
      { status: 500 }
    );
  }
}
