import { connectToDatabase } from "@/utils/mongodb";
import { NextRequest } from "next/server";

// GET /api/subschool/:name
export async function GET(
  req: NextRequest,
  { params }: { params: { name: string } }
) {
  try {
    const { name } = params;
    const db = await connectToDatabase();
    const subschool = await db.collection("subschool").findOne({ name });
    return Response.json(subschool, { status: 200 });
  } catch (error) {
    return Response.json(
      { error: "Failed to fetch subschool data" },
      { status: 500 }
    );
  }
}

// PATCH /api/subschool/:name
export async function PATCH(
  req: Request,
  { params }: { params: { name: string } }
) {
  try {
    const { name } = params;
    const body = await req.json();

    const db = await connectToDatabase();
    await db.collection("subschool").updateOne(
      { name },
      {
        $set: {
          ...body,
        },
      },
      { upsert: true }
    );
    return Response.json(
      { message: "Subschool data updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { error: "Failed to update subschool data" },
      { status: 500 }
    );
  }
}
