import { connectToDatabase } from "@/utils/mongodb";
import { Text } from "../model";

export interface ContactBanner {
  img: string;
  title?: Text;
  description?: Text;
}

export interface ContactEntity {
  name: string;
  banner: ContactBanner;
  title: Text;
  description: Text;
  facebook?: string;
  instagram?: string;
  youtube?: string;
  line?: string;
  phone: string;
  email: string;
  address: Text;
}

// GET /api/contact
export async function GET() {
  try {
    const db = await connectToDatabase();
    const contact = await db.collection("contact").find({}).toArray();
    return Response.json(contact, { status: 200 });
  } catch (error) {
    return Response.json(
      { error: "Failed to fetch contact data" },
      { status: 500 }
    );
  }
}

// POST /api/contact
export async function POST(req: Request) {
  try {
    const {
      lang,
      name,
      banner,
      title,
      description,
      facebook,
      instagram,
      youtube,
      line,
      phone,
      email,
      address,
    } = await req.json();
    if (
      !lang ||
      !name ||
      !banner ||
      !title ||
      !description ||
      !phone ||
      !email ||
      !address
    ) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    const db = await connectToDatabase();
    await db.collection("contact").insertOne({
      lang,
      name,
      banner,
      title,
      description,
      facebook,
      instagram,
      youtube,
      line,
      phone,
      email,
      address,
    });
    return Response.json(
      { message: "Contact data created successfully" },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { error: "Failed to create contact data" },
      { status: 500 }
    );
  }
}
