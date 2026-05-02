import { prisma } from "./prisma.js";

export async function getFeedPosts(userId) {
  const following = await prisma.follow.findMany({
    where: {
      followerId: userId,
    },
    select: {
      followingId: true,
    },
  });

  const feedAuthorIds = following.map((follow) => follow.followingId);
  feedAuthorIds.push(userId);

  return prisma.post.findMany({
    where: {
      authorId: {
        in: feedAuthorIds,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: true,
      comments: {
        orderBy: {
          createdAt: "asc",
        },
        include: {
          author: true,
        },
      },
      likes: true,
      reposts: true,
      _count: {
        select: {
          comments: true,
          likes: true,
          reposts: true,
        },
      },
    },
  });
}

export async function getPostById(postId) {
  return prisma.post.findUnique({
    where: {
      id: postId,
    },
    include: {
      author: true,
      comments: {
        orderBy: {
          createdAt: "asc",
        },
        include: {
          author: true,
        },
      },
      likes: true,
      reposts: true,
      _count: {
        select: {
          comments: true,
          likes: true,
          reposts: true,
        },
      },
    },
  });
}

export async function getPostsByUser(userId) {
  return prisma.post.findMany({
    where: {
      authorId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: true,
      likes: true,
      comments: {
        orderBy: {
          createdAt: "asc",
        },
        include: {
          author: true,
        },
      },
      reposts: true,
      _count: {
        select: {
          comments: true,
          likes: true,
          reposts: true,
        },
      },
    },
  });
}

export async function createPost(authorId, content) {
  return prisma.post.create({
    data: {
      authorId,
      content,
    },
  });
}

export async function deletePost(postId, authorId) {
  return prisma.post.deleteMany({
    where: {
      id: postId,
      authorId,
    },
  });
}

export async function addComment(postId, authorId, content) {
  return prisma.comment.create({
    data: {
      postId,
      authorId,
      content,
    },
    include: {
      author: true,
      post: true,
    },
  });
}

export async function likePost(postId, userId) {
  return prisma.like.create({
    data: {
      postId,
      userId,
    },
  });
}

export async function unlikePost(postId, userId) {
  return prisma.like.delete({
    where: {
      postId_userId: {
        postId,
        userId,
      },
    },
  });
}

export async function toggleLike(postId, userId) {
  const existingLike = await prisma.like.findUnique({
    where: {
      postId_userId: {
        postId,
        userId,
      },
    },
    select: {
      id: true,
    },
  });

  if (existingLike) {
    await unlikePost(postId, userId);
    return { liked: false };
  }

  await likePost(postId, userId);
  return { liked: true };
}

export async function repostPost(postId, userId) {
  return prisma.repost.create({
    data: {
      postId,
      userId,
    },
  });
}

export async function removeRepost(postId, userId) {
  return prisma.repost.delete({
    where: {
      postId_userId: {
        postId,
        userId,
      },
    },
  });
}

export async function getMostLikedPosts(limit = 10) {
  return prisma.post.findMany({
    take: limit,
    include: {
      author: true,
      _count: {
        select: {
          likes: true,
          comments: true,
          reposts: true,
        },
      },
    },
    orderBy: [
      {
        likes: {
          _count: "desc",
        },
      },
      {
        createdAt: "desc",
      },
    ],
  });
}
