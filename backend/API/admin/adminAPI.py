from mongodb.mongodb import MongoDB
from pymongo import ReturnDocument
from fastapi import APIRouter, Body, HTTPException, status, UploadFile, File
from fastapi.responses import Response, FileResponse
import jwt, datetime, os, shutil
from models.user import *
from models.article import *
from models.category import *
from utils.config import server_storage_path, img_url_path, audio_url_path


router = APIRouter()

mongo = MongoDB("mongodb+srv://chebiche:admin@atlascluster.q8ewu8y.mongodb.net/", "treenews")

user_collection = mongo.get_collection('users')
article_collection = mongo.get_collection('article')
cat_collection = mongo.get_collection('categories')


class ChangePasswordModel(BaseModel):
    old_password: str = Field(...)
    new_password: str = Field(...)

@router.post("/login", response_description="User login", response_model_by_alias=False)
async def login(loginData: LoginModel = Body(...)):

    data = loginData.model_dump(by_alias=True)

    user = user_collection.find_one({"email": data['email'], "password": data['password']}, {"_id": 1, "userType": 1})
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

@router.get(
    "/getuser/{id}",
    response_description="Get a single user",
    response_model=UserModel,
    response_model_by_alias=False,
)
async def show_user(id: str):
    """
    Get the record for a specific user, looked up by `id`.
    """
    if (
        user := user_collection.find_one({"_id": ObjectId(id)})
    ) is not None:
        return user

    raise HTTPException(status_code=404, detail=f"user {id} not found")


@router.get(
    "/getusers",
    response_description="List all users",
    response_model=UserCollection,
    response_model_by_alias=False,
)
async def get_list_users(n: Optional[int] = 100):
    users = user_collection.find().to_list(n)
    return UserCollection(users=users)

@router.get("/dashboard")
async def get_dashboard_info():
    result = {
        "articles": article_collection.count_documents({}),
        "users": user_collection.count_documents({}),
        "categories": cat_collection.count_documents({}),
    }
    return result