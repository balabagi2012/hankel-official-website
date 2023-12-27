import { connectToDatabase } from "@/utils/mongodb";
import { ObjectId } from "mongodb";
import { NextRequest } from "next/server";

// GET /api/news/:id
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const db = await connectToDatabase();
    const news = await db.collection("news").findOne({ _id: new ObjectId(id) });
    return Response.json(news, { status: 200 });
  } catch (error) {
    return Response.json(
      { error: "Failed to fetch news data" },
      { status: 500 }
    );
  }
}

// PATCH /api/news/:id
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await req.json();
    const db = await connectToDatabase();
    await db.collection("news").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...body,
          updatedAt: new Date().getTime(),
        },
      },
      { upsert: true }
    );
    return Response.json(
      { message: "News data updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      { error: "Failed to update news data" },
      { status: 500 }
    );
  }
}

// DELETE /api/news/:id
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const db = await connectToDatabase();
    await db.collection("news").deleteOne({ _id: new ObjectId(id) });
    return Response.json(
      { message: "News data deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      { error: "Failed to delete news data" },
      { status: 500 }
    );
  }
}
