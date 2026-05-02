// route.js - API endpoint for platform statistics
// Calls all stat functions from the stats repository
// Person 4 - Statistics use-case

import {
  getTotalUsers,
  getTotalPosts,
  getTotalComments,
  getTotalLikes,
  getAvgPostsPerUser,
  getAvgFollowersPerUser,
  getTopFollowedUsers,
  getTopLikedPosts,
  getTopRepostedPosts,
  getMostActiveUser,
} from "../../../repos/stats.js";

export async function GET() {
  try {
    // Run all queries in parallel for better performance
    const [
      totalUsers,
      totalPosts,
      totalComments,
      totalLikes,
      avgPostsPerUser,
      avgFollowersPerUser,
      topFollowedUsers,
      topLikedPosts,
      topRepostedPosts,
      mostActiveUser,
    ] = await Promise.all([
      getTotalUsers(),
      getTotalPosts(),
      getTotalComments(),
      getTotalLikes(),
      getAvgPostsPerUser(),
      getAvgFollowersPerUser(),
      getTopFollowedUsers(),
      getTopLikedPosts(),
      getTopRepostedPosts(),
      getMostActiveUser(),
    ]);

    return Response.json({
      totalUsers,
      totalPosts,
      totalComments,
      totalLikes,
      avgPostsPerUser,
      avgFollowersPerUser,
      topFollowedUsers,
      topLikedPosts,
      topRepostedPosts,
      mostActiveUser,
    });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}