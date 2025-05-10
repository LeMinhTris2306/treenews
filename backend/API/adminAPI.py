from mongodb.mongodb import MongoDB
from pymongo import ReturnDocument
from fastapi import APIRouter, Body, HTTPException, status, UploadFile, File
from fastapi.responses import Response, FileResponse
import jwt, datetime, os, shutil
from models.user import *

router = APIRouter()

mongo = MongoDB("mongodb+srv://chebiche:admin@atlascluster.q8ewu8y.mongodb.net/", "treenews")
user_collection = mongo.get_collection('users')

server_storage_path = r"D:\Python\user_storage"

class ChangePasswordModel(BaseModel):
    old_password: str = Field(...)
    new_password: str = Field(...)

@router.post("/login", response_description="User login", response_model_by_alias=False)
async def login(loginData: LoginModel = Body(...)):

    data = loginData.model_dump(by_alias=True)

    user = user_collection.find_one({"email": data['email'], "password": data['password']}, {"_id": 1})
    if user is None:
        raise HTTPException(status_code=401, detail=f"User not found")
    
    if user['userType'] != "Admin" :
        raise HTTPException(status_code=403, detail=f"User have no permission")
    
    payload = {
        "userid": str(user["_id"]),
        "exp": datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(minutes=15)
    }
    
    token = jwt.encode(payload, "treenews", algorithm="HS256")
    return token