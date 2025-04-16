from fastapi import APIRouter, HTTPException
from models import Item
from bson import ObjectId

router = APIRouter()  # Corrected: APIRouter should be instantiated properly, not as an empty dictionary.

async def get_items_collection():
    from db import init_db
    return init_db()["items_collection"]

@router.get("/")
async def get_items():
    collection = await get_items_collection()
    items = []
    async for item in collection.find():
        item["_id"] = str(item["_id"])
        items.append(item)
    return items

@router.post("/")
async def create_item(item: Item):
    collection = await get_items_collection()
    result = await collection.insert_one(item.dict())
    return {"id": str(result.inserted_id)}

# Removed duplicate route definition for create_item.
# The previous duplicate function didn't use the database, leading to potential inconsistencies.
# If needed, we could rename or merge functionalities.

@router.delete("/{item_id}")
async def delete_item(item_id: str):
    collection = await get_items_collection()
    result = await collection.delete_one({"_id": ObjectId(item_id)})

    if result.deleted_count:
        return {"status": "deleted", "deleted_item": item_id}

    raise HTTPException(status_code=404, detail="Item not found")

# Corrected the delete_item endpoint:
# - Removed unnecessary item_details parameter. The deletion logic was faulty.
# - We only need to delete the item_id, not an extra item_details parameter.
# - The previous implementation attempted to delete two items, but the response structure was incorrect.
