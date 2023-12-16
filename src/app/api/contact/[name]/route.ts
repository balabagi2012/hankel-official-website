import { connectToDatabase } from "@/utils/mongodb";
import { NextRequest } from "next/server";

// GET /api/contact/:name
export async function GET(
  request: NextRequest,
  { params }: { params: { name: string } }
) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const lang = searchParams.get("lang") ?? "en";
    const { name } = params;
    const db = await connectToDatabase();
    const about = await db.collection("contact").findOne({ name, lang });
    if (!about) {
      return Response.json(
        { error: "Contact data not found" },
        { status: 404 }
      );
    }
    return Response.json(about, { status: 200 });
  } catch (error) {
    return Response.json(
      { error: "Failed to fetch contact data" },
      { status: 500 }
    );
  }
}

// PATCH /api/contact/:name
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
    await db.collection("contact").updateOne(
      { name, lang: body.lang },
      {
        $set: {
          ...body,
        },
      },
      { upsert: true }
    );
    return Response.json(
      { message: "Contact data updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { error: "Failed to update contact data" },
      { status: 500 }
    );
  }
}

// DELETE /api/contact/:name
export async function DELETE(
  req: Request,
  { params }: { params: { name: string } }
) {
  try {
    const { name } = params;
    const { lang } = await req.json();
    if (!lang) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const db = await connectToDatabase();
    const result = await db.collection("contact").deleteOne({ name, lang });
    if (result.deletedCount === 0) {
      return Response.json(
        { error: "Contact data not found" },
        { status: 404 }
      );
    }
    return Response.json(
      { message: "Contact data deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { error: "Failed to delete contact data" },
      { status: 500 }
    );
  }
}
