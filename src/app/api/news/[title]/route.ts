import { connectToDatabase } from "@/utils/mongodb";
import { NextRequest } from "next/server";

// GET /api/news/:title
export async function GET(
  req: NextRequest,
  { params }: { params: { title: string } }
) {
  try {
    const { title } = params;
    const db = await connectToDatabase();
    const news = await db.collection("news").findOne({ title });
    return Response.json(news, { status: 200 });
  } catch (error) {
    return Response.json(
      { error: "Failed to fetch news data" },
      { status: 500 }
    );
  }
}

// PATCH /api/news/:title
export async function PATCH(
  req: Request,
  { params }: { params: { title: string } }
) {
  try {
    const { title } = params;
    const body = await req.json();

    const db = await connectToDatabase();
    await db.collection("news").updateOne(
      { title },
      {
        $set: {
          ...body,
          updatedAt: new Date(),
        },
      },
      { upsert: true }
    );
    return Response.json(
      { message: "News data updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { error: "Failed to update news data" },
      { status: 500 }
    );
  }
}
