import { connectToDatabase } from "@/utils/mongodb";
import { NextRequest } from "next/server";

export interface HomeEntity {
  lang: "zh" | "en";
  title: string;
  subtitle: string;
  description: string;
  banner: string;
  programTitle: string;
  programs: Program[];
  subBanner: SubBanner;
}

export interface SubBanner {
  title: string;
  description: string;
  img: string;
}

export interface Program {
  type: string;
  title: string;
  content: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
  line?: string;
}

// GET /api/home/
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const lang = searchParams.get("lang") ?? "en";
    const db = await connectToDatabase();
    const home = await db.collection("home").findOne({ lang });
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

// POST /api/home/
export async function POST(req: Request) {
  try {
    const {
      lang,
      title,
      subtitle,
      description,
      banner,
      programTitle,
      programs,
      subBanner,
    } = await req.json();

    if (
      !lang ||
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

    const home: HomeEntity = {
      lang,
      title,
      subtitle,
      description,
      programTitle,
      banner,
      programs,
      subBanner,
    };

    await db.collection("home").insertOne(home);

    return Response.json(home, { status: 200 });
  } catch (error) {
    return Response.json(
      { error: "Failed to create home data" },
      { status: 500 }
    );
  }
}

// PATCH /api/home/
export async function PATCH(req: Request) {
  try {
    const {
      lang,
      title,
      subtitle,
      description,
      banner,
      programTitle,
      programs,
      subBanner,
    } = await req.json();

    if (
      !lang ||
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

    const home: HomeEntity = {
      lang,
      title,
      subtitle,
      description,
      banner,
      programTitle,
      programs,
      subBanner,
    };

    await db.collection("home").updateOne({ lang }, { $set: home });

    return Response.json(home, { status: 200 });
  } catch (error) {
    return Response.json(
      { error: "Failed to update home data" },
      { status: 500 }
    );
  }
}

// DELETE /api/home/
export async function DELETE(req: Request) {
  try {
    const { lang } = await req.json();

    if (!lang) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const db = await connectToDatabase();

    await db.collection("home").deleteOne({ lang });

    return Response.json({ status: "ok" }, { status: 200 });
  } catch (error) {
    return Response.json(
      { error: "Failed to delete home data" },
      { status: 500 }
    );
  }
}
