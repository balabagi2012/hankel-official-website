import path from "path";
import { unlink } from "fs/promises";

// DELETE /api/file/:path
export async function DELETE(
  req: Request,
  { params }: { params: { path: string } }
) {
  try {
    const { path: filePath } = params;
    await unlink(path.join(process.cwd(), "/public/uploads/" + filePath));
    return Response.json(
      { message: "File deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return Response.json({ error: "File delete failed" }, { status: 500 });
  }
}
