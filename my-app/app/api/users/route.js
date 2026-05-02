import { getAllUsers, createUser } from "../../../repos/users.js";

export async function GET() {
  try {
    const data = await getAllUsers();
    return Response.json(data);
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const data = await createUser(body);
    return Response.json(data, { status: 201 });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}