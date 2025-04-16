from fastapi import FastAPI
from routes.items import router as items_router
from routes.analytics import router as analytics_router
from routes.quiz import router as quiz_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Add CORS middleware for frontend-backend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Update with specific origins in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers with prefixes for better organization
app.include_router(items_router, prefix="/items")
app.include_router(analytics_router, prefix="/analytics")  # Added prefix
app.include_router(quiz_router, prefix="/quiz")  # Added prefix

@app.get("/")
async def get_home():
    """Root route to welcome users."""
    return {"message": "Welcome to the Multi-Page FastAPI App!"}
