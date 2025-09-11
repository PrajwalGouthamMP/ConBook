async function renderUserProfile(userId = 1) {
    try {
        // Fetch user and posts
        const [userRes, postsRes] = await Promise.all([
            fetch(`https://jsonplaceholder.typicode.com/users/${userId}`),
            fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
        ]);

        const user = await userRes.json();
        const posts = await postsRes.json();

        // Profile Card
        const profileCard = document.getElementById("profile-card");
        const initials = user.name.split(" ").map(n => n[0]).join("").toUpperCase();

        profileCard.innerHTML = `
            <div class="profile-header">
                <div class="profile-avatar">${initials}</div>
                <div class="profile-details">
                    <h2>@${user.username}</h2>
                    <p>${user.name}</p>
                    <p>Email: ${user.email}</p>
                    <p>Phone: ${user.phone}</p>
                    <p>Address: ${user.address.suite}, ${user.address.street}, ${user.address.city}</p>
                    <div class="profile-stats">
                        <div><strong>${posts.length}</strong> Posts</div>
                      
                    </div>
                    <button class="create-post-btn"><i class="fas fa-plus"></i> Create New Post</button>
                </div>
            </div>
        `;

        // User Posts
        const userPostsContainer = document.getElementById("user-posts");
        userPostsContainer.innerHTML = "";

        posts.forEach(post => {
            const postCard = document.createElement("div");
            postCard.classList.add("resource-card");
            postCard.innerHTML = `
                <div class="resource-body">
                   
                    <div class="post-content">
                        <h4>${post.title}</h4>
                        <p>${post.body}</p>
                    </div>
                </div>
            `;
            userPostsContainer.appendChild(postCard);
        });

    } catch (err) {
        console.error("Error fetching user/profile data:", err);
    }
}

document.addEventListener("DOMContentLoaded", () => renderUserProfile());
document.addEventListener("DOMContentLoaded", () => {
    // Navigation items
    const navMap = {
        "nav-home": "app.html",
        "nav-post": "posts.html",
        "nav-album": "album.html",
        "nav-settings": "settings.html",
        "nav-users": "users.html",
        "nav-logout": "login.html" // redirect to login on logout
    };

    Object.keys(navMap).forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.style.cursor = "pointer"; // pointer cursor
            element.addEventListener("click", () => {
                window.location.href = navMap[id];
            });
        }
    });
});
