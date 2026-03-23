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
            id:        "u_user01",
            username:  "Dr. Omar Al-Fahad",
            email:     "omar@qu.edu.qa",
            password:  "pass123",
            bio:       "Computer Science Professor specializing in Cryptography and Distributed Systems.",
            following: [],
            createdAt: new Date().toISOString()
        },
        {
            id:        "u_user02",
            username:  "Fatima Mahmoud",
            email:     "fatima@qu.edu.qa",
            password:  "pass123",
            bio:       "Mechanical Engineering Senior. Passionate about sustainable energy solutions.",
            following: [],
            createdAt: new Date().toISOString()
        },
        {
            id:        "u_user03",
            username:  "Engr. Khalid Jassim",
            email:     "khalid@qu.edu.qa",
            password:  "pass123",
            bio:       "Data Systems Architect focusing on scalable cloud infrastructure for research.",
            following: [],
            createdAt: new Date().toISOString()
        },
        {
            id:        "u_user04",
            username:  "Sara Al-Kuwari",
            email:     "sara@qu.edu.qa",
            password:  "pass123",
            bio:       "PhD Researcher in AI Ethics and Policy. Examining the cultural impact of LLMs.",
            following: [],
            createdAt: new Date().toISOString()
        },
        {
            id:        "u_user05",
            username:  "Hamad Bin Ali",
            email:     "hamad@qu.edu.qa",
            password:  "pass123",
            bio:       "Full-stack developer at QU IT. Expert in Laravel and Python systems.",
            following: [],
            createdAt: new Date().toISOString()
        },
        {
            id:        "u_user06",
            username:  "Noora Al-Sulaiti",
            email:     "noora@qu.edu.qa",
            password:  "pass123",
            bio:       "Cybersecurity Analyst. Interested in Zero-Trust architectures and pen testing.",
            following: [],
            createdAt: new Date().toISOString()
        },
        {
            id:        "u_user07",
            username:  "Ahmed Al-Misned",
            email:     "ahmed@qu.edu.qa",
            password:  "pass123",
            bio:       "Embedded Systems specialist. Building low-power IoT devices for smart campuses.",
            following: [],
            createdAt: new Date().toISOString()
        },
        {
            id:        "u_user08",
            username:  "Dr. Dana Haroon",
            email:     "dana@qu.edu.qa",
            password:  "pass123",
            bio:       "Assistant Professor of Mathematics. Researching complex algorithms for optimization.",
            following: [],
            createdAt: new Date().toISOString()
        },
        {
            id:        "u_user09",
            username:  "Hussain",
            email:     "hussain@qu.edu.qa",
            password:  "pass123",
            bio:       "Computer Engineering student at Qatar University.",
            following: [],
            createdAt: new Date().toISOString()
        },
        {
            id:        "u_user10",
            username:  "Labib",
            email:     "labib@qu.edu.qa",
            password:  "pass123",
            bio:       "Computer Engineering student passionate about web development.",
            following: [],
            createdAt: new Date().toISOString()
        }
    ];
    saveUsers(users);

    const posts = [
        {
            id: generateId("p"),
            authorId: users[0].id,
            content: "Design systems and how to integrate with MCP servers",
            likes: [],
            comments: [],
            createdAt: new Date().toISOString()
        },
        {
            id: generateId("p"),
            authorId: users[4].id,
            content: "Hardware system design and its effects on the new release of AirPods Max 2",
            likes: [],
            comments: [],
            createdAt: new Date().toISOString()
        },
        {
            id: generateId("p"),
            authorId: users[9].id,
            content: "This is very technical post by me discussing some real stuff in the tech industry",
            likes: [],
            comments: [],
            createdAt: new Date().toISOString()
        },
    ];
    savePosts(posts);
    
}

seedData();