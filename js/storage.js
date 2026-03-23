// ============================================
// DATA SCHEMA REFERENCE
// ============================================

// USER object
// {
//     id:        "u_xxxxxxx",
//     username:  "Abdulrahman",
//     email:     "a@qu.edu.qa",
//     password:  "pass123",
//     bio:       "CS student at QU",
//     following: ["u_xxxxxxx", "u_xxxxxxx"],
//     createdAt: "2026-03-22T01:00:00.000Z"
// }

// POST object
// {
//     id:        "p_xxxxxxx",
//     authorId:  "u_xxxxxxx",
//     content:   "Hello QUGeeks!",
//     likes:     ["u_xxxxxxx"],
//     comments:  [
//         {
//             id:        "c_xxxxxxx",
//             authorId:  "u_xxxxxxx",
//             content:   "Great post!",
//             createdAt: "2026-03-22T01:00:00.000Z"
//         }
//     ],
//     createdAt: "2026-03-22T01:00:00.000Z"
// }

// SESSION object
// {
//     userId: "u_xxxxxxx"
// }

// ============================================
// localStorage KEYS
// "users"   → array of user objects
// "posts"   → array of post objects
// "session" → session object
// ============================================

function getUsers(){

    const all_users = JSON.parse(localStorage.getItem("users")) || [];
    return all_users;

}

function saveUsers(users){

    localStorage.setItem("users", JSON.stringify(users));

}

function getUserById(id){

    const users = getUsers();
    const user = users.find( user => user.id === id);
    return user;

}

//here posts and stuff related to it

function getPosts(){

    const all_posts= JSON.parse(localStorage.getItem("posts")) || [];
    return all_posts;
}

function savePosts(posts){

    localStorage.setItem("posts", JSON.stringify(posts));

}

// here for sessions 

function getSession(){

    return JSON.parse(localStorage.getItem("session")) || null;
}

function saveSession(userId){

    localStorage.setItem("session", JSON.stringify({userId : userId}));

}

function clearSession(){
    localStorage.removeItem("session");
}

//seed


function seedData() {
    
    if (getUsers().length > 0) return; 
    
    const users = [
        {
             id:        generateId("u"),
            username:  "Omar",
            email:     "omar@qu.edu.qa",
            password:  "pass123",
            bio:       "Computer Science student",
            following: [],
            createdAt: new Date().toISOString()
        },
        {
             id:        generateId("u"),
            username:  "Hussain",
            email:     "hussain@qu.edu.qa",
            password:  "pass123",
            bio:       "Computer Engineering student",
            following: [],
            createdAt: new Date().toISOString()
        },
        {
             id:        generateId("u"),
            username:  "Labib",
            email:     "labib@qu.edu.qa",
            password:  "pass123",
            bio:       "Computer Engineering student",
            following: [],
            createdAt: new Date().toISOString()
        }

    ]
    saveUsers(users);

    const posts = [
        {
            id: generateId("p"),
            authorId: users[0].id,
            content: "design systems and how to integrate with MCP servers",
            likes: [],
            comments: [],
            createdAt: new Date().toISOString()
        },
        {
            id: generateId("p"),
            authorId: users[1].id,
            content: "hardware system design and its affects on the new release of airpods max 2",
            likes: [],
            comments: [],
            createdAt: new Date().toISOString()
        },
        {
            id: generateId("p"),
            authorId: users[2].id,
            content: "this is very technical post by me discussing some real stuff in the tech industry",
            likes: [],
            comments: [],
            createdAt: new Date().toISOString()
        },
    ]
    savePosts(posts);
    
}

seedData();