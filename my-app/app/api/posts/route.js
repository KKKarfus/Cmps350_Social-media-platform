import { getFeedPosts, createPost, getPostsByUser } from "../../../repos/posts.js";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const authorId = searchParams.get("authorId");

    const data = authorId
      ? await getPostsByUser(authorId)
      : await getFeedPosts(userId);

    return Response.json(data);
  } catch (e) {

    return Response.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {

    const { authorId, content } = await request.json();

    const data = await createPost(authorId, content);
    return Response.json(data, { status: 201 });
  } catch (e) {

    return Response.json({ error: e.message }, { status: 500 });
  }
}
