module.exports = [
"[project]/my-app/repos/prisma.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "prisma",
    ()=>prisma
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dotenv$2f$config$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/dotenv/config.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$app$2f$prisma$2f$client$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/my-app/prisma/client/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$adapter$2d$libsql$2f$dist$2f$index$2d$node$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@prisma/adapter-libsql/dist/index-node.mjs [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$adapter$2d$libsql$2f$dist$2f$index$2d$node$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$adapter$2d$libsql$2f$dist$2f$index$2d$node$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
const globalForPrisma = globalThis;
const adapter = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$adapter$2d$libsql$2f$dist$2f$index$2d$node$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PrismaLibSql"]({
    url: process.env.DATABASE_URL
});
const prisma = globalForPrisma.prisma || new __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$app$2f$prisma$2f$client$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PrismaClient"]({
    adapter
});
if ("TURBOPACK compile-time truthy", 1) {
    globalForPrisma.prisma = prisma;
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/my-app/repos/posts.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "addComment",
    ()=>addComment,
    "createPost",
    ()=>createPost,
    "deletePost",
    ()=>deletePost,
    "getFeedPosts",
    ()=>getFeedPosts,
    "getMostLikedPosts",
    ()=>getMostLikedPosts,
    "getPostById",
    ()=>getPostById,
    "getPostsByUser",
    ()=>getPostsByUser,
    "likePost",
    ()=>likePost,
    "removeRepost",
    ()=>removeRepost,
    "repostPost",
    ()=>repostPost,
    "toggleLike",
    ()=>toggleLike,
    "unlikePost",
    ()=>unlikePost
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$app$2f$repos$2f$prisma$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/my-app/repos/prisma.js [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$app$2f$repos$2f$prisma$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$my$2d$app$2f$repos$2f$prisma$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
async function getFeedPosts(userId) {
    const following = await __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$app$2f$repos$2f$prisma$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].follow.findMany({
        where: {
            followerId: userId
        },
        select: {
            followingId: true
        }
    });
    const feedAuthorIds = following.map((follow)=>follow.followingId);
    feedAuthorIds.push(userId);
    return __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$app$2f$repos$2f$prisma$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].post.findMany({
        where: {
            authorId: {
                in: feedAuthorIds
            }
        },
        orderBy: {
            createdAt: "desc"
        },
        include: {
            author: true,
            comments: {
                orderBy: {
                    createdAt: "asc"
                },
                include: {
                    author: true
                }
            },
            likes: true,
            reposts: true,
            _count: {
                select: {
                    comments: true,
                    likes: true,
                    reposts: true
                }
            }
        }
    });
}
async function getPostById(postId) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$app$2f$repos$2f$prisma$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].post.findUnique({
        where: {
            id: postId
        },
        include: {
            author: true,
            comments: {
                orderBy: {
                    createdAt: "asc"
                },
                include: {
                    author: true
                }
            },
            likes: true,
            reposts: true,
            _count: {
                select: {
                    comments: true,
                    likes: true,
                    reposts: true
                }
            }
        }
    });
}
async function getPostsByUser(userId) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$app$2f$repos$2f$prisma$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].post.findMany({
        where: {
            authorId: userId
        },
        orderBy: {
            createdAt: "desc"
        },
        include: {
            author: true,
            likes: true,
            comments: {
                orderBy: {
                    createdAt: "asc"
                },
                include: {
                    author: true
                }
            },
            reposts: true,
            _count: {
                select: {
                    comments: true,
                    likes: true,
                    reposts: true
                }
            }
        }
    });
}
async function createPost(authorId, content) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$app$2f$repos$2f$prisma$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].post.create({
        data: {
            authorId,
            content
        }
    });
}
async function deletePost(postId, authorId) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$app$2f$repos$2f$prisma$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].post.deleteMany({
        where: {
            id: postId,
            authorId
        }
    });
}
async function addComment(postId, authorId, content) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$app$2f$repos$2f$prisma$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].comment.create({
        data: {
            postId,
            authorId,
            content
        },
        include: {
            author: true,
            post: true
        }
    });
}
async function likePost(postId, userId) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$app$2f$repos$2f$prisma$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].like.create({
        data: {
            postId,
            userId
        }
    });
}
async function unlikePost(postId, userId) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$app$2f$repos$2f$prisma$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].like.delete({
        where: {
            postId_userId: {
                postId,
                userId
            }
        }
    });
}
async function toggleLike(postId, userId) {
    const existingLike = await __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$app$2f$repos$2f$prisma$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].like.findUnique({
        where: {
            postId_userId: {
                postId,
                userId
            }
        },
        select: {
            id: true
        }
    });
    if (existingLike) {
        await unlikePost(postId, userId);
        return {
            liked: false
        };
    }
    await likePost(postId, userId);
    return {
        liked: true
    };
}
async function repostPost(postId, userId) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$app$2f$repos$2f$prisma$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].repost.create({
        data: {
            postId,
            userId
        }
    });
}
async function removeRepost(postId, userId) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$app$2f$repos$2f$prisma$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].repost.delete({
        where: {
            postId_userId: {
                postId,
                userId
            }
        }
    });
}
async function getMostLikedPosts(limit = 10) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$app$2f$repos$2f$prisma$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].post.findMany({
        take: limit,
        include: {
            author: true,
            _count: {
                select: {
                    likes: true,
                    comments: true,
                    reposts: true
                }
            }
        },
        orderBy: [
            {
                likes: {
                    _count: "desc"
                }
            },
            {
                createdAt: "desc"
            }
        ]
    });
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/my-app/app/api/posts/route.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$app$2f$repos$2f$posts$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/my-app/repos/posts.js [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$app$2f$repos$2f$posts$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$my$2d$app$2f$repos$2f$posts$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("userId");
        const authorId = searchParams.get("authorId");
        const data = authorId ? await (0, __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$app$2f$repos$2f$posts$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getPostsByUser"])(authorId) : await (0, __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$app$2f$repos$2f$posts$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getFeedPosts"])(userId);
        return Response.json(data);
    } catch (e) {
        return Response.json({
            error: e.message
        }, {
            status: 500
        });
    }
}
async function POST(request) {
    try {
        const { authorId, content } = await request.json();
        const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$app$2f$repos$2f$posts$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createPost"])(authorId, content);
        return Response.json(data, {
            status: 201
        });
    } catch (e) {
        return Response.json({
            error: e.message
        }, {
            status: 500
        });
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=my-app_095y6z3._.js.map