import { connectToDatabase } from "@/utils/mongodb";

export interface ContactBanner {
  img: string;
  title?: string;
  description?: string;
}

export interface ContactEntity {
  lang: "zh" | "en";
  name: string;
  banner: ContactBanner;
  title: string;
  description: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
  line?: string;
  phone: string;
  email: string;
  address: string;
}

// GET /api/contact
export async function GET() {
  try {
    const db = await connectToDatabase();
    const about = await db.collection("contact").find({}).toArray();
    return Response.json({ about }, { status: 200 });
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
      title,
      description,
      banner,
      facebook,
      instagram,
      youtube,
      line,
      phone,
      email,
      address,
    } = await req.json();
    if (!lang || !name) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const db = await connectToDatabase();
    const result = await db.collection("contact").insertOne({
      lang,
      name,
      title,
      description,
      banner,
      facebook,
      instagram,
      youtube,
      line,
      phone,
      email,
      address,
    });
    return Response.json({ result }, { status: 200 });
  } catch (error) {
    return Response.json(
      { error: "Failed to create contact data" },
      { status: 500 }
    );
  }
}
