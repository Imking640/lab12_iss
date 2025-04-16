const baseURL = process.env.API_BASE_URL || "http://localhost:8000"; // Use environment variable if available

async function loadItems(searchTerm = "") {
  try {
    const res = await fetch(`${baseURL}/items`);
    if (!res.ok) {
      throw new Error(`Failed to fetch items: ${res.statusText}`);
    }
    const data = await res.json();
    const list = document.getElementById("itemList");
    if (!list) {
      console.error("Element with ID 'itemList' not found.");
      return;
    }
    list.innerHTML = "";

    const filteredItems = data.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const itemCountEl = document.getElementById("itemCount");
    if (itemCountEl) {
      itemCountEl.textContent = `Total items: ${filteredItems.length}`;
    }

    filteredItems.forEach(item => {
      const li = document.createElement("li");
      li.textContent = `${item.name}: ${item.description}`;
      const del = document.createElement("button");
      del.textContent = "Delete";
      del.onclick = () => deleteItem(item._id);
      li.appendChild(del);
      list.appendChild(li);
    });
  } catch (error) {
    console.error("Error loading items:", error);
    alert("Failed to load items. Please try again later.");
  }
}

async function deleteItem(id) {
  try {
    const res = await fetch(`${baseURL}/items/${id}`, { method: "DELETE" }); // Changed to DELETE method
    if (!res.ok) {
      throw new Error(`Failed to delete item: ${res.statusText}`);
    }
    loadItems(document.getElementById("search").value);
  } catch (error) {
    console.error("Error deleting item:", error);
    alert("Failed to delete item. Please try again later.");
  }
}

document.getElementById("search").addEventListener("input", (e) => {
  loadItems(e.target.value);
});

document.getElementById("itemForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const description = document.getElementById("description").value;
  try {
    const res = await fetch(`${baseURL}/items`, {
      method: "POST",
      headers: { "Content-Type": "application/json" }, // Fixed Content-Type
      body: JSON.stringify({ name, description })
    });
    if (!res.ok) {
      throw new Error(`Failed to create item: ${res.statusText}`);
    }
    e.target.reset();
    loadItems(document.getElementById("search").value);
  } catch (error) {
    console.error("Error creating item:", error);
    alert("Failed to create item. Please try again later.");
  }
});

loadItems();
