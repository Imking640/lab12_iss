const baseURL = process.env.API_BASE_URL || "http://localhost:8000"; // Use environment variable for base URL

// Function to load all users
async function loadUsers() {
  try {
    const res = await fetch(`${baseURL}/users`); // Added baseURL for consistency
    if (!res.ok) {
      throw new Error(`Failed to fetch users: ${res.statusText}`);
    }
    const users = await res.json();
    const list = document.getElementById("userList");
    if (!list) {
      console.error("Element with ID 'userList' not found.");
      return;
    }
    list.innerHTML = "";

    const userCountEl = document.getElementById("userCounts");
    if (userCountEl) {
      userCountEl.textContent = `Total users: ${users.length}`;
    }

    users.forEach(user => {
      const li = document.createElement("li");
      li.textContent = `${user.username}: ${user.bio}`;

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.onclick = async () => {
        try {
          const deleteRes = await fetch(`${baseURL}/users/${user._id}`, { method: "DELETE" }); // Fixed DELETE method
          if (!deleteRes.ok) {
            throw new Error(`Failed to delete user: ${deleteRes.statusText}`);
          }
          loadUsers(); // Reload users after deletion
        } catch (error) {
          console.error("Error deleting user:", error);
          alert("Failed to delete user. Please try again later.");
        }
      };

      li.appendChild(deleteBtn);
      list.appendChild(li);
    });
  } catch (error) {
    console.error("Error loading users:", error);
    alert("Failed to load users. Please try again later.");
  }
}

// Event listener for search functionality
document.getElementById("search").addEventListener("input", async (e) => {
  const term = e.target.value.toLowerCase();
  try {
    const res = await fetch(`${baseURL}/users`); // Added baseURL for consistency
    if (!res.ok) {
      throw new Error(`Failed to fetch users: ${res.statusText}`);
    }
    const users = await res.json();
    const list = document.getElementById("userList");
    if (!list) {
      console.error("Element with ID 'userList' not found.");
      return;
    }
    list.innerHTML = "";

    const filteredUsers = users.filter(user => user.username.toLowerCase().includes(term));
    const userCountEl = document.getElementById("userCount");
    if (userCountEl) {
      userCountEl.textContent = `Total users: ${filteredUsers.length}`;
    }

    filteredUsers.forEach(user => {
      const li = document.createElement("li");
      li.textContent = `${user.username}: ${user.bio}`;

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.onclick = async () => {
        try {
          const deleteRes = await fetch(`${baseURL}/users/${user._id}`, { method: "DELETE" }); // Fixed DELETE method
          if (!deleteRes.ok) {
            throw new Error(`Failed to delete user: ${deleteRes.statusText}`);
          }
          loadUsers(); // Reload users after deletion
        } catch (error) {
          console.error("Error deleting user:", error);
          alert("Failed to delete user. Please try again later.");
        }
      };

      li.appendChild(deleteBtn);
      list.appendChild(li);
    });
  } catch (error) {
    console.error("Error filtering users:", error);
    alert("Failed to filter users. Please try again later.");
  }
});

// Event listener for user form submission
document.getElementById("userForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const bio = document.getElementById("bio").value;
  try {
    const res = await fetch(`${baseURL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, bio })
    });
    if (!res.ok) {
      throw new Error(`Failed to create user: ${res.statusText}`);
    }
    e.target.reset();
    loadUsers(); // Reload users after adding a new user
  } catch (error) {
    console.error("Error creating user:", error);
    alert("Failed to create user. Please try again later.");
  }
});

// Initial load of users
loadUsers();
