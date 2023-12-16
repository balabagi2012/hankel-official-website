import { connectToDatabase } from "@/utils/mongodb";
import { Text } from "../model";

export interface FacilityEntity {
  name: string;
  banner: string;
  title: Text;
  description: Text;
  facilityTitle: Text;
  facilities: Facility[];
  facilityImg: string;
}

export interface Facility {
  img: string;
  title: Text;
  description: Text;
}

// GET /api/facility
export async function GET() {
  try {
    const db = await connectToDatabase();
    await db.collection("facility").updateMany(
      {},
      {
        $unset: {
          facilitiyImg: 1,
        },
        $set: {
          facilityImg: "https://images.unsplash.com/photo-1494949649109-ecfc3b8c35df?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
      }
    );
    const facility = await db.collection("facility").find({}).toArray();
    return Response.json({ facility }, { status: 200 });
  } catch (error) {
    return Response.json(
      { error: "Failed to fetch facility data" },
      { status: 500 }
    );
  }
}

// POST /api/facility
export async function POST(req: Request) {
  try {
    const {
      name,
      banner,
      title,
      description,
      facilityTitle,
      facilities,
      facilityImg,
    } = await req.json();
    if (
      !name ||
      !title ||
      !description ||
      !facilityImg ||
      !facilityTitle ||
      !facilities
    ) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    const db = await connectToDatabase();
    const facility = await db.collection("facility").insertOne({
      name,
      banner,
      title,
      description,
      facilityTitle,
      facilities,
      facilityImg,
    });
    return Response.json({ facility }, { status: 200 });
  } catch (error) {
    return Response.json(
      { error: "Failed to create facility data" },
      { status: 500 }
    );
  }
}
