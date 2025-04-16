from motor.motor_asyncio import AsyncIOMotorClient
import os

def init_db():
    """Initialize the MongoDB connection and return collections."""
    MONGO_URI = os.getenv("MONGO_URL", "mongodb://localhost:27017")  # Get MongoDB URI from environment
    DATABASE_NAME = os.getenv("MONGO_DB_NAME", "testdb")  # Get database name from environment, default to "testdb"
    
    client = AsyncIOMotorClient(MONGO_URI)  # Initialize MongoDB client
    db = client[DATABASE_NAME]  # Use the specified database

    return {
        "items_collection": db["item"],  # Return the items collection
        "users_collection": db["users"]  # Return the users collection
    }
