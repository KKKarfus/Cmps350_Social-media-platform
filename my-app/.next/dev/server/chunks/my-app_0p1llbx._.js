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
"[project]/my-app/repos/users.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "createUser",
    ()=>createUser,
    "followUser",
    ()=>followUser,
    "getAllUsers",
    ()=>getAllUsers,
    "getFollowers",
    ()=>getFollowers,
    "getFollowing",
    ()=>getFollowing,
    "getTrendingUsers",
    ()=>getTrendingUsers,
    "getUserByEmail",
    ()=>getUserByEmail,
    "getUserById",
    ()=>getUserById,
    "isFollowing",
    ()=>isFollowing,
    "unfollowUser",
    ()=>unfollowUser,
    "updateUser",
    ()=>updateUser
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dotenv$2f$config$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/dotenv/config.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$app$2f$repos$2f$prisma$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/my-app/repos/prisma.js [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$app$2f$repos$2f$prisma$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$my$2d$app$2f$repos$2f$prisma$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
async function getAllUsers() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$app$2f$repos$2f$prisma$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].user.findMany({
        orderBy: {
            username: "asc"
        },
        include: {
            _count: {
                select: {
                    posts: true,
                    followers: true,
                    following: true
                }
            }
        }
    });
}
async function getUserById(id) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$app$2f$repos$2f$prisma$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].user.findUnique({
        where: {
            id
        },
        include: {
            _count: {
                select: {
                    posts: true,
                    followers: true,
                    following: true
                }
            }
        }
    });
}
async function getUserByEmail(email) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$app$2f$repos$2f$prisma$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].user.findUnique({
        where: {
            email: email.trim().toLowerCase()
        }
    });
}
async function createUser({ username, email, password, bio = "" }) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$app$2f$repos$2f$prisma$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].user.create({
        data: {
            username,
            email: email.trim().toLowerCase(),
            password,
            bio
        }
    });
}
async function updateUser(id, { username, bio }) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$app$2f$repos$2f$prisma$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].user.update({
        where: {
            id
        },
        data: {
            username,
            bio
        }
    });
}
async function followUser(followerId, followingId) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$app$2f$repos$2f$prisma$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].follow.create({
        data: {
            followerId,
            followingId
        }
    });
}
async function unfollowUser(followerId, followingId) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$app$2f$repos$2f$prisma$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].follow.delete({
        where: {
            followerId_followingId: {
                followerId,
                followingId
            }
        }
    });
}
async function isFollowing(followerId, followingId) {
    const follow = await __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$app$2f$repos$2f$prisma$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].follow.findUnique({
        where: {
            followerId_followingId: {
                followerId,
                followingId
            }
        },
        select: {
            id: true
        }
    });
    return Boolean(follow);
}
async function getFollowers(userId) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$app$2f$repos$2f$prisma$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].follow.findMany({
        where: {
            followingId: userId
        },
        include: {
            follower: {
                select: {
                    id: true,
                    username: true,
                    bio: true
                }
            }
        }
    });
}
async function getFollowing(userId) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$app$2f$repos$2f$prisma$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].follow.findMany({
        where: {
            followerId: userId
        },
        include: {
            following: {
                select: {
                    id: true,
                    username: true,
                    bio: true
                }
            }
        }
    });
}
async function getTrendingUsers(limit = 10) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$app$2f$repos$2f$prisma$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].user.findMany({
        take: limit,
        select: {
            id: true,
            username: true,
            bio: true,
            _count: {
                select: {
                    followers: true,
                    posts: true
                }
            }
        },
        orderBy: [
            {
                followers: {
                    _count: "desc"
                }
            },
            {
                username: "asc"
            }
        ]
    });
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/my-app/app/api/users/route.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$app$2f$repos$2f$users$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/my-app/repos/users.js [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$app$2f$repos$2f$users$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$my$2d$app$2f$repos$2f$users$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
async function GET() {
    try {
        const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$app$2f$repos$2f$users$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAllUsers"])();
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
        const body = await request.json();
        const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$app$2f$repos$2f$users$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createUser"])(body);
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

//# sourceMappingURL=my-app_0p1llbx._.js.map