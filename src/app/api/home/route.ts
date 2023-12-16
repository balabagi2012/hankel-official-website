import { connectToDatabase } from "@/utils/mongodb";
import { NextRequest } from "next/server";
import { Text } from "../model";

export interface HomeEntity {
  title: Text;
  subtitle: Text;
  description: Text;
  banner: string;
  programTitle: Text;
  programs: Program[];
  subBanner: SubBanner;
}

export interface SubBanner {
  title: Text;
  description: Text;
  img: string;
}

export interface Program {
  type: string;
  title: Text;
  content: Text;
  facebook?: string;
  instagram?: string;
  youtube?: string;
  line?: string;
}

// GET /api/home/
export async function GET(request: NextRequest) {
  try {
    const db = await connectToDatabase();
    const home = await db.collection("home").findOne({});
    if (!home) {
      return Response.json({ error: "Home data not found" }, { status: 404 });
    }
    return Response.json(home, { status: 200 });
  } catch (error) {
    return Response.json(
      {
        error: "Failed to fetch about data",
        errorMessage: (error as Error).message,
      },
      { status: 500 }
    );
  }
}

// POST /api/home
export async function POST(req: Request) {
  try {
    const {
      title,
      subtitle,
      description,
      banner,
      programTitle,
      programs,
      subBanner,
    } = await req.json();
    if (
      !title ||
      !subtitle ||
      !description ||
      !banner ||
      !programTitle ||
      !programs ||
      !subBanner
    ) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    const db = await connectToDatabase();
    await db.collection("home").insertOne({
      title,
      subtitle,
      description,
      banner,
      programTitle,
      programs,
      subBanner,
    });
    return Response.json(
      { message: "Home data created successfully" },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { error: "Failed to create home data" },
      { status: 500 }
    );
  }
}

// PATCH /api/home
export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const db = await connectToDatabase();
    await db.collection("home").updateOne(
      {},
      {
        $set: {
          ...body,
        },
      },
      { upsert: true }
    );
    return Response.json(
      { message: "Home data updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { error: "Failed to update home data" },
      { status: 500 }
    );
  }
}
