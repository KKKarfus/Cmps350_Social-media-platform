import { getPostById, deletePost } from "../../../../repos/posts.js";

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const data = await getPostById(id);
    if (!data) return Response.json({ error: "Post not found" }, { status: 404 });
    return Response.json(data);
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const { authorId } = await request.json();
    await deletePost(id, authorId);
    return Response.json({ success: true });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}