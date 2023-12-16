import { connectToDatabase } from "@/utils/mongodb";
import { NextRequest } from "next/server";
// GET /api/about/:name
export async function GET(
  request: NextRequest,
  { params }: { params: { name: string } }
) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const lang = searchParams.get("lang") ?? "en";
    const { name } = params;
    const db = await connectToDatabase();
    const about = await db.collection("about").findOne({ name, lang });
    if (!about) {
      return Response.json({ error: "About data not found" }, { status: 404 });
    }
    return Response.json(about, { status: 200 });
  } catch (error) {
    return Response.json(
      { error: "Failed to fetch about data" },
      { status: 500 }
    );
  }
}

// PATCH /api/about/:name
export async function PATCH(
  req: Request,
  { params }: { params: { name: string } }
) {
  try {
    const { name } = params;
    const body = await req.json();
    if (!body.lang) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    const db = await connectToDatabase();
    await db
      .collection("about")
      .findOneAndUpdate({ name, lang: body.lang }, { $set: { ...body } });
    return Response.json(
      { message: "About data updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { error: "Failed to update about data" },
      { status: 500 }
    );
  }
}

// DELETE /api/about/:name
export async function DELETE(
  req: Request,
  { params }: { params: { name: string } }
) {
  try {
    const { name } = params;
    const db = await connectToDatabase();
    const result = await db.collection("about").deleteOne({ name });

    if (result.deletedCount === 0) {
      return Response.json({ error: "About data not found" }, { status: 404 });
    }
    return Response.json(
      { message: "About data deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { error: "Failed to delete about data" },
      { status: 500 }
    );
  }
}
