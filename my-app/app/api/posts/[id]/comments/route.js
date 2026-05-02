import { addComment } from "../../../../../repos/posts.js";

export async function POST(request, { params }) {
  try {

    const { id } = await params;
    const { authorId, content } = await request.json();

    const data = await addComment(id, authorId, content);
    return Response.json(data, { status: 201 });

  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
    
  }
}