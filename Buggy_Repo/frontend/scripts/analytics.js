const baseURL = "http://localhost:8001";

async function loadAnalytics() {
  try {
    const res = await fetch(`${baseURL}/analytics`);

    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();

    // Added null checks to prevent errors in case data.stats is missing
    if (data.stats) {
      document.getElementById("itemCount").textContent = data.stats.item_count ?? "N/A";
      document.getElementById("userCount").textContent = data.stats.user_count ?? "N/A";
      
      // Ensuring values exist before calling `toFixed()`
      document.getElementById("avgItemName").textContent = (data.stats.avg_item_name_length ?? 0).toFixed(2);
      document.getElementById("avgUserName").textContent = (data.stats.avg_user_username_length ?? 0).toFixed(2);
      
      document.getElementById("maxItemName").textContent = data.stats.max_item_name_length ?? "N/A";
      document.getElementById("maxUserName").textContent = data.stats.max_user_username_length ?? "N/A";
    } else {
      console.error("Data.stats is undefined or missing.");
    }

    // Ensuring data.plot exists before setting image source
    if (data.plot) {
      document.getElementById("plot").src = data.plot;
    } else {
      console.warn("Plot data is missing.");
    }

  } catch (error) {
    console.error("Error loading analytics:", error);
  }
}

loadAnalytics();
