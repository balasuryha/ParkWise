from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import nearby_parking, list_available_parking_spots
from app.auth.routes import signup, login, get_profile, premium_feature  # import functions
from fastapi.security import HTTPBearer
from fastapi.openapi.utils import get_openapi
import os

bearer_scheme = HTTPBearer()

app = FastAPI(
    title="ParkWise API",
    version="1.0.0",
    openapi_tags=[{"name": "default", "description": "All API endpoints"}]
    )

origins = os.getenv("FRONTEND_ORIGINS", "http://localhost:3000").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount API route groups
app.include_router(nearby_parking.router)
app.include_router(list_available_parking_spots.router)


# Explicit auth routes
app.add_api_route("/signup", signup, methods=["POST"])
app.add_api_route("/login", login, methods=["POST"])
app.add_api_route("/profile", get_profile, methods=["GET"])
app.add_api_route("/premium-feature", premium_feature, methods=["GET"])

@app.get("/")
def root():
    return {"message": "Welcome to ParkWise API "}

def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema
    openapi_schema = get_openapi(
        title="ParkWise API ",
        version="1.0.0",
        description="Smart Parking + Auth API",
        routes=app.routes,
    )
    openapi_schema["components"]["securitySchemes"] = {
        "BearerAuth": {
            "type": "http",
            "scheme": "bearer",
            "bearerFormat": "JWT"
        }
    }
    for path in openapi_schema["paths"].values():
        for method in path.values():
            method["security"] = [{"BearerAuth": []}]
    app.openapi_schema = openapi_schema
    return app.openapi_schema

app.openapi = custom_openapi