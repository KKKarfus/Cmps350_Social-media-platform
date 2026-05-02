import { getUserById, updateUser } from "../../../../repos/users.js";

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const data = await getUserById(id);
    if (!data) return Response.json({ error: "User not found" }, { status: 404 });
    return Response.json(data);
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const data = await updateUser(id, body);
    return Response.json(data);
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}