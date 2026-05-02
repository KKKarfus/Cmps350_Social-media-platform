import { getFollowers } from "../../../../../repos/users.js";

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const data = await getFollowers(id);
    return Response.json(data);
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}