import { connectToDatabase } from "@/utils/mongodb";

export interface NewsEntity {
  _id?: string;
  title: Text;
  description: Text;
  category: string;
  banner: string;
  content: Text;
  createdAt: Date;
  updatedAt: Date;
}

// GET /api/news
export async function GET() {
  try {
    const db = await connectToDatabase();
    const news = await db.collection("news").find({}).toArray();
    if (!news) {
      return Response.json({ error: "News data not found" }, { status: 404 });
    }
    return Response.json(news, { status: 200 });
  } catch (error) {
    return Response.json(
      {
        error: "Failed to fetch news data",
        errorMessage: (error as Error).message,
      },
      { status: 500 }
    );
  }
}

// POST /api/news
export async function POST(req: Request) {
  try {
    const { title, description, category, banner, content } = await req.json();
    if (!title || !description || !category || !banner || !content) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    const db = await connectToDatabase();
    const news = await db.collection("news").insertOne({
      title,
      description,
      category,
      banner,
      content,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return Response.json(news, { status: 201 });
  } catch (error) {
    return Response.json(
      {
        error: "Failed to create news data",
        errorMessage: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
