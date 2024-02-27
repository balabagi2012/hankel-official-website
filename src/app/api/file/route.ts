import path from "path";
import { readdir, writeFile } from "fs/promises";
import { NextRequest } from "next/server";

// GET /api/file
export const GET = async () => {
  try {
    const files = await readdir("./public/uploads");
    return Response.json(files, { status: 200 });
  } catch (error) {
    console.log((error as Error).message);
    return Response.json(
      { error: "Failed to fetch file data" },
      { status: 500 }
    );
  }
};

// POST /api/file
export const POST = async (req: NextRequest) => {
  const formData = await req.formData();
  const file: File | null = formData.get("file") as unknown as File;
  let fileName: string | null = formData.get("fileName") as string;
  const filePath: string | null = formData.get("filePath") as string;

  if (!file) {
    return Response.json({ error: "No files received" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  fileName = fileName
    ? fileName + "." + file?.name?.replaceAll(" ", "_")?.split(".")[1]
    : Date.now() + "." + file?.name?.replaceAll(" ", "_")?.split(".")[1];

  try {
    const finalFilePath = `/public/${filePath ?? "uploads"}/${fileName}`;
    await writeFile(
      path.join(process.cwd(), `/public/${filePath ?? "uploads"}/` + fileName),
      buffer
    );
    const result = {
      message: "File created successfully",
      file: finalFilePath.replaceAll("/public", ""),
    };
    return Response.json(result, { status: 201 });
  } catch (error) {
    console.log((error as Error).message);
    return Response.json({ message: "Image created failed" }, { status: 500 });
  }
};
