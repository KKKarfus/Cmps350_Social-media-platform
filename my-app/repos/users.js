import "dotenv/config";
import { prisma } from "./prisma.js";

export async function getAllUsers() {
  return prisma.user.findMany({
    orderBy: {
      username: "asc",
    },
    include: {
      _count: {
        select: {
          posts: true,
          followers: true,
          following: true,
        },
      },
    },
  });
}

export async function getUserById(id) {
  return prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      _count: {
        select: {
          posts: true,
          followers: true,
          following: true,
        },
      },
    },
  });
}

export async function getUserByEmail(email) {
  return prisma.user.findUnique({
    where: {
      email: email.trim().toLowerCase(),
    },
  });
}

export async function createUser({ username, email, password, bio = "" }) {
  return prisma.user.create({
    data: {
      username,
      email: email.trim().toLowerCase(),
      password,
      bio,
    },
  });
}

export async function updateUser(id, { username, bio }) {
  return prisma.user.update({
    where: {
      id,
    },
    data: {
      username,
      bio,
    },
  });
}

export async function followUser(followerId, followingId) {
  return prisma.follow.create({
    data: {
      followerId,
      followingId,
    },
  });
}

export async function unfollowUser(followerId, followingId) {
  return prisma.follow.delete({
    where: {
      followerId_followingId: {
        followerId,
        followingId,
      },
    },
  });
}

export async function isFollowing(followerId, followingId) {
  const follow = await prisma.follow.findUnique({
    where: {
      followerId_followingId: {
        followerId,
        followingId,
      },
    },
    select: {
      id: true,
    },
  });

  return Boolean(follow);
}

export async function getFollowers(userId) {
  return prisma.follow.findMany({
    where: {
      followingId: userId,
    },
    include: {
      follower: {
        select: {
          id: true,
          username: true,
          bio: true,
        },
      },
    },
  });
}

export async function getFollowing(userId) {
  return prisma.follow.findMany({
    where: {
      followerId: userId,
    },
    include: {
      following: {
        select: {
          id: true,
          username: true,
          bio: true,
        },
      },
    },
  });
}

export async function getTrendingUsers(limit = 10) {
  return prisma.user.findMany({
    take: limit,
    select: {
      id: true,
      username: true,
      bio: true,
      _count: {
        select: {
          followers: true,
          posts: true,
        },
      },
    },
    orderBy: [
      {
        followers: {
          _count: "desc",
        },
      },
      {
        username: "asc",
      },
    ],
  });
}
