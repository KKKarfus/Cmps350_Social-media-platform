import { prisma } from "./prisma.js";

export async function getTotalUsers() {
  return prisma.user.count();
}
export async function getTotalPosts() {
  return prisma.post.count();
}
export async function getTotalComments() {
  return prisma.comment.count();
}
export async function getTotalLikes() {
  return prisma.like.count();
}
export async function getAvgPostsPerUser() {
  const [posts, users] = await Promise.all([prisma.post.count(), prisma.user.count()]);
  return users > 0 ? (posts / users).toFixed(2) : 0;
}
export async function getAvgFollowersPerUser() {
  const [follows, users] = await Promise.all([prisma.follow.count(), prisma.user.count()]);
  return users > 0 ? (follows / users).toFixed(2) : 0;
}
export async function getTopFollowedUsers() {
  return prisma.user.findMany({
    take: 5,
    include: { _count: { select: { followers: true } } },
    orderBy: { followers: { _count: "desc" } }
  });
}
export async function getTopLikedPosts() {
  return prisma.post.findMany({
    take: 5,
    include: { author: true, _count: { select: { likes: true } } },
    orderBy: { likes: { _count: "desc" } }
  });
}
export async function getTopRepostedPosts() {
  return getTopLikedPosts();
}
export async function getMostActiveUser() {
  const users = await prisma.user.findMany({
    include: { _count: { select: { posts: true, comments: true } } }
  });
  return users.sort((a, b) =>
    (b._count.posts + b._count.comments) - (a._count.posts + a._count.comments)
  )[0];
}
