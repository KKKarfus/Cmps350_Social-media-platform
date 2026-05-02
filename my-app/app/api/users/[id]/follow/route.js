import { followUser, unfollowUser, isFollowing } from "../../../../../repos/users.js";

export async function POST(request, { params }) {
  try {
    const { id } = await params;
    const { followerId } = await request.json();
    const data = await followUser(followerId, id);
    return Response.json(data, { status: 201 });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const { followerId } = await request.json();
    await unfollowUser(followerId, id);
    return Response.json({ success: true });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}
