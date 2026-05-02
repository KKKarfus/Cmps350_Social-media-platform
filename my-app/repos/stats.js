// stats.js - Data repository for platform statistics
// All database queries for the statistics page
// Person 4 - Statistics use-case

import { prisma } from "./prisma.js";

// Query 1: Count all registered users
export async function getTotalUsers() {
  return prisma.user.count();
}

// Query 2: Count all posts
export async function getTotalPosts() {
  return prisma.post.count();
}

// Query 3: Count all comments
export async function getTotalComments() {
  return prisma.comment.count();
}

// Query 4: Count all likes
export async function getTotalLikes() {
  return prisma.like.count();
}

// Query 5: Calculate average number of posts per user
export async function getAvgPostsPerUser() {
  const totalUsers = await prisma.user.count();
  const totalPosts = await prisma.post.count();
  if (totalUsers === 0) return 0;
  return (totalPosts / totalUsers).toFixed(2);
}

// Query 6: Calculate average number of followers per user
export async function getAvgFollowersPerUser() {
  const totalUsers = await prisma.user.count();
  const totalFollows = await prisma.follow.count();
  if (totalUsers === 0) return 0;
  return (totalFollows / totalUsers).toFixed(2);
}

// Query 7: Get top 5 most followed users, ordered by follower count descending
export async function getTopFollowedUsers() {
  return prisma.user.findMany({
    select: {
      id: true,
      username: true,
      _count: {
        select: { followers: true },
      },
    },
    orderBy: {
      followers: { _count: "desc" },
    },
    take: 5,
  });
}

// Query 8: Get top 5 most liked posts, ordered by like count descending
export async function getTopLikedPosts() {
  return prisma.post.findMany({
    select: {
      id: true,
      content: true,
      author: { select: { username: true } },
      _count: {
        select: { likes: true },
      },
    },
    orderBy: {
      likes: { _count: "desc" },
    },
    take: 5,
  });
}

// Query 9: Get top 5 most reposted posts, ordered by repost count descending
export async function getTopRepostedPosts() {
  return prisma.post.findMany({
    select: {
      id: true,
      content: true,
      author: { select: { username: true } },
      _count: {
        select: { reposts: true },
      },
    },
    orderBy: {
      reposts: { _count: "desc" },
    },
    take: 5,
  });
}

// Query 10: Get most active user based on total posts + comments combined
export async function getMostActiveUser() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      _count: {
        select: { posts: true, comments: true },
      },
    },
  });

  // Sort by total activity (posts + comments) in descending order
  return users.sort(
    (a, b) =>
      b._count.posts + b._count.comments - (a._count.posts + a._count.comments)
  )[0];
}