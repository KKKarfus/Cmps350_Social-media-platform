function generateId(prefix){
    return prefix+"_"+Math.random().toString(36).slice(2, 9);
}

function formatDate(isoString) {
    const date = new Date(isoString);
    return date.toLocaleDateString(
        "en-GB",{
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
        }
    )}

 function getInitials(username) {
    return username.slice(0, 2).toUpperCase();
}