from fastapi import APIRouter
from fastapi.responses import JSONResponse
import numpy as np
import matplotlib.pyplot as plt
import io
import base64
from db import init_db  # Moved import to the top for efficiency

router = APIRouter()

async def get_items_collection():
    return init_db()["items_collection"]  # Removed redundant inline import

async def get_users_collection():
    return init_db()["users_collection"]  # Removed redundant inline import

@router.get("/")
async def get_analytics():
    items_collection = await get_items_collection()
    users_collection = await get_users_collection()

    # Fetch items and users from the database
    items = []
    async for item in items_collection.find({}, {"name": 1}):  # Fetch only the "name" field
        items.append(item)
    
    users = []
    async for user in users_collection.find({}, {"username": 1}):  # Fetch only the "username" field
        users.append(user)

    # Calculate statistics
    item_count = len(items)
    user_count = len(users)

    # Fixed incorrect key names to match expected database schema
    item_name_lengths = np.array([len(item["name"]) for item in items]) if items else np.array([])
    user_username_lengths = np.array([len(user["username"]) for user in users]) if users else np.array([])

    stats = {
        "item_count": item_count,
        "user_count": user_count,
        "avg_item_name_length": float(item_name_lengths.mean()) if item_name_lengths.size > 0 else 0.0,
        "avg_user_username_length": float(user_username_lengths.mean()) if user_username_lengths.size > 0 else 0.0,
        "max_item_name_length": int(item_name_lengths.max()) if item_name_lengths.size > 0 else 0,
        "max_user_username_length": int(user_username_lengths.max()) if user_username_lengths.size > 0 else 0,
    }

    # Generate histogram plot
    plt.figure(figsize=(8, 6))
    if item_name_lengths.size > 0:
        plt.hist(item_name_lengths, bins=10, alpha=0.5, label="Item Names", color="blue")
    if user_username_lengths.size > 0:
        plt.hist(user_username_lengths, bins=10, alpha=0.5, label="Usernames", color="green")

    plt.title("Distribution of Name Lengths")
    plt.xlabel("Length")
    plt.ylabel("Frequency")
    plt.legend()

    # Save plot to buffer and encode as base64
    buffer = io.BytesIO()
    plt.savefig(buffer, format="png")
    buffer.seek(0)
    image_base64 = base64.b64encode(buffer.getvalue()).decode("utf-8")
    plt.close()

    # Return stats and plot
    return JSONResponse({
        "stats": stats,
        "plot": image_base64  # Added plot to the response
    })
