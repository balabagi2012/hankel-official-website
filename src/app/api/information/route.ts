import { connectToDatabase } from "@/utils/mongodb";
import { Text } from "../model";

export interface InformationEntity {
  name: string;
  banner: string;
  admissionBrochure: AdmissionBrochure;
  informationSession: InformationSession;
  lunchMenu: LunchMenu;
  calendar: Calendar;
}

export interface Calendar {
  text: Text;
  img: string;
  file: string;
}
export interface AdmissionBrochure {
  title: Text;
  description: Text;
  file: string;
}

export interface InformationSession {
  title: Text;
  description: Text;
  img: string;
}

export interface LunchMenu {
  title: Text;
  description: Text;
  img: string;
}

// GET /api/information
export async function GET() {
  try {
    const db = await connectToDatabase();
    const information = await db.collection("information").find({}).toArray();
    return Response.json(information, { status: 200 });
  } catch (error) {
    return Response.json(
      { error: "Failed to fetch information data" },
      { status: 500 }
    );
  }
}

// POST /api/information
export async function POST(req: Request) {
  try {
    const { name, banner, admissionBrochure, informationSession, lunchMenu } =
      await req.json();
    if (
      !name ||
      !banner ||
      !admissionBrochure ||
      !informationSession ||
      !lunchMenu
    ) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    const db = await connectToDatabase();
    await db.collection("information").insertOne({
      name,
      banner,
      admissionBrochure,
      informationSession,
      lunchMenu,
    });
    return Response.json(
      { message: "Information data created successfully" },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { error: "Failed to create information data" },
      { status: 500 }
    );
  }
}
