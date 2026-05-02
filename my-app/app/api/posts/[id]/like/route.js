import { toggleLike } from "../../../../../repos/posts.js";

export async function POST(request, { params }) {

  try {

    const { id } = await params;
    const { userId } = await request.json();

    const data = await toggleLike(id, userId);
    return Response.json(data);

  } catch (e) {
    
    return Response.json({ error: e.message }, { status: 500 });
  }
}