
async function fetchPostsUsersComments() {
    try {
        // Fetch all together
        const [postsResponse, usersResponse, commentsResponse] = await Promise.all([
            fetch("https://jsonplaceholder.typicode.com/posts"),
            fetch("https://jsonplaceholder.typicode.com/users"),
            fetch("https://jsonplaceholder.typicode.com/comments")
        ]);

        const posts = await postsResponse.json();
        const users = await usersResponse.json();
        const comments = await commentsResponse.json();

        // Build lookup maps
        const userMap = {};
        users.forEach(user => {
            userMap[user.id] = user.username;
        });

        const commentsByPost = {};
        comments.forEach(comment => {
            if (!commentsByPost[comment.postId]) {
                commentsByPost[comment.postId] = [];
            }
            commentsByPost[comment.postId].push(comment);
        });

        // Select container
        const resourceList = document.querySelector(".resource-list");

        // Limit posts (say 6 for demo)
        posts.slice(0, 6).forEach(post => {
            const username = userMap[post.userId] || "Unknown";
            const postComments = commentsByPost[post.id] || [];

            // Create resource card
            const card = document.createElement("div");
            card.classList.add("resource-card");

            // Prepare initial 3 comments
            let commentsHTML = "";
            postComments.slice(0, 2).forEach(comment => {
                commentsHTML += `
                    <div class="comment">
                        <p class="comment-text">${comment.body}</p>
                        <div class="comment-user">
                            <i class="fas fa-user-circle"></i> @${comment.email.split("@")[0]}
                        </div>
                    </div>`;
            });

            card.innerHTML = `
                <div class="resource-body">
                    <!-- Post Header -->
                    <div class="post-header">
                        <i class="fas fa-user-circle"></i>
                        <span class="posted-by">Posted by <strong>@${username}</strong></span>
                    </div>

                    <!-- Post Content -->
                    <div class="post-content">
                        <h4>${post.title}</h4>
                        <p>${post.body}</p>
                    </div>

                    <!-- Actions (aligned right) -->
                    <div class="post-actions">
                       
                            <button class="action-btn"><i class="fas fa-heart"></i> Like</button>
                            <button class="action-btn"><i class="fas fa-comment"></i> Comment</button>
                       
                    </div>

                    <!-- Comments -->
                    <div class="post-comments">
                        ${commentsHTML}
                        ${postComments.length > 3 ? `<button class="load-more">Load more comments</button>` : ""}
                    </div>
                </div>
            `;

            // Handle "Load more"
            const loadMoreBtn = card.querySelector(".load-more");
            if (loadMoreBtn) {
                loadMoreBtn.addEventListener("click", () => {
                    const moreComments = postComments.slice(3);
                    const commentsContainer = loadMoreBtn.parentElement;

                    moreComments.forEach(comment => {
                        const div = document.createElement("div");
                        div.classList.add("comment");
                        div.innerHTML = `
                            <p class="comment-text">${comment.body}</p>
                            <div class="comment-user">
                                <i class="fas fa-user-circle"></i> @${comment.email.split("@")[0]}
                            </div>
                        `;
                        commentsContainer.insertBefore(div, loadMoreBtn);
                    });

                    loadMoreBtn.remove();
                });
            }

            // Append card
            resourceList.appendChild(card);
        });
    } catch (error) {
        console.error("Error fetching posts/users/comments:", error);
    }
}

document.addEventListener("DOMContentLoaded", fetchPostsUsersComments);
document.addEventListener("DOMContentLoaded", () => {
    const headerProfile = document.getElementById("user-profile");
    if (headerProfile) {
        headerProfile.style.cursor = "pointer";
        headerProfile.addEventListener("click", () => {
            window.location.href = "user.html";
        });
    }
});

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


