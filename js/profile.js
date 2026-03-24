


document.addEventListener("DOMContentLoaded",()=>{

    const session = getSession();
    if(!session){
        window.location.href = "index.html";
        return;
    }

    const currentUserId = session.userId;

    const params = new URLSearchParams(window.location.search);
    const profileId = params.get("id");
    const profileUserId = profileId ? profileId : currentUserId;
    const user = getUserById(profileUserId);


})