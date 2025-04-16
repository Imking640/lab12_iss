from fastapi import FastAPI
from routes.items import router as items_router
from routes.analytics import router as analytics_router
from routes.quiz import router as quiz_router
from routes.users import router as users_router  # Added import for users_router

app = FastAPI()

# Include routers for different modules
app.include_router(items_router, prefix="/items")  # Items routes
app.include_router(analytics_router, prefix="/analytics")  # Analytics routes
app.include_router(quiz_router, prefix="/quiz")  # Quiz routes
app.include_router(users_router, prefix="/users")  # Added inclusion for users_router

@app.get("/home")
async def get_home():
    """Root route to welcome users."""
    return {"message": "Welcome to the Multi-Page FastAPI App!"}
