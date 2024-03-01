import { connectToDatabase } from "@/utils/mongodb";
import { readdir, unlink } from "fs/promises";
import path from "path";

function findUploadValues(obj: any, result: string[]) {
  for (const key in obj) {
    if (typeof obj[key] === "object") {
      findUploadValues(obj[key], result);
    } else if (typeof obj[key] === "string" && obj[key].includes("/uploads")) {
      result.push(obj[key]);
    }
  }
}

function findMissingValues(array1: string[], array2: string[]): string[] {
  const missingValues: string[] = [];
  for (const value of array1) {
    if (!array2.includes(value)) {
      missingValues.push(value);
    }
  }

  return missingValues;
}

// GET /api/file/clear
export async function GET(req: Request) {
  try {
    const files = (await readdir("./public/uploads")).map(
      (fileName) => "/uploads/" + fileName
    );
    const db = await connectToDatabase();
    const [
      events,
      news,
      about,
      contact,
      curriculum,
      facility,
      home,
      information,
      subschool,
      team,
    ] = await Promise.all([
      db.collection("event").find().toArray(),
      db.collection("news").find().toArray(),
      db.collection("about").find().toArray(),
      db.collection("contact").find().toArray(),
      db.collection("curriculum").find().toArray(),
      db.collection("facility").find().toArray(),
      db.collection("home").find().toArray(),
      db.collection("information").find().toArray(),
      db.collection("subschool").find().toArray(),
      db.collection("team").find().toArray(),
    ]);
    const uploadValues: string[] = ["/uploads/favicon.ico"];
    for (const objArray of [
      events,
      news,
      about,
      contact,
      curriculum,
      facility,
      home,
      information,
      subschool,
      team,
    ]) {
      // 遍历当前对象数组中的每个对象
      for (const obj of objArray) {
        findUploadValues(obj, uploadValues);
      }
    }
    const clearFiles = findMissingValues(files, uploadValues);
    await Promise.all(
      clearFiles.map(
        async (file) =>
          await unlink(path.join(process.cwd(), "/public/" + file))
      )
    );
    return Response.json({ clearFiles: clearFiles }, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ error: "File delete failed" }, { status: 500 });
  }
}
