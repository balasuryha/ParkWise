from fastapi import APIRouter, Query
from app.core.config import supabase

router = APIRouter()

# @router.get("/parking-spots")
# def get_parking_spot_names(limit: int = Query(4, ge=1), 
#     offset: int = Query(0, ge=0)):
#     try:
#         response = supabase.table("real_time_parking_spots") \
#             .select("facilityid, nom_parking") \
#             .execute()

#         if not response.data:
#             return []

#         # Remove duplicates if needed
#         unique_spots = {
#             row["facilityid"]: row["nom_parking"]
#             for row in response.data
#             if row.get("facilityid") and row.get("nom_parking")
#         }

#         return [
#             {"id": fid, "name": name}
#             for fid, name in unique_spots.items()
#         ]

#     except Exception as e:
#         return {"error": str(e)}
@router.get("/parking-spots")
def get_parking_spot_names(limit: int = Query(4, ge=1), 
    offset: int = Query(0, ge=0)):
    try:
        response = supabase.table("real_time_parking_spots") \
            .select("facilityid, nom_parking, latitude, longitude, image_url") \
            .range(offset, offset + limit - 1) \
            .execute()

        if not response.data:
            return []

        return response.data

    except Exception as e:
        return {"error": str(e)}