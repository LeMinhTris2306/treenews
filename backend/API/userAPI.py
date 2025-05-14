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

@router.post(
    "/",
    response_description="Add new user",
    response_model=UserModel,
    status_code=status.HTTP_201_CREATED,
    response_model_by_alias=False
)
async def create_user(user: UserModel = Body(...)):
    user_info = user.model_dump(by_alias=True, exclude=["id"])

    user_exists = user_collection.find_one({"email": user_info['email']})
    if user_exists is not None:
        raise HTTPException(status_code=409, detail=f"Email {user_info['email']} exists")
    
    new_user = user_collection.insert_one(
        user_info
    )
    created_user = user_collection.find_one(
        {"_id": new_user.inserted_id}
    )
    return created_user

@router.get(
    "/",
    response_description="List all users",
    response_model=UserCollection,
    response_model_by_alias=False,
)
async def get_list_users(n: Optional[int] = 100):
    users = user_collection.find().to_list(n)
    return UserCollection(users=users)

@router.get(
    "/{id}",
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

@router.put(
    "/{id}",
    response_description="Update a user",
    response_model=UserModel,
    response_model_by_alias=False
)
async def update_user(id: str, user: UpdateUserModel = Body(...)):
    user = {
        k: v for k, v in user.model_dump(by_alias=True).items() if v is not None
    }
    try:
        user.pop('email', None)
    except:
        pass
    
    print(user)
    if len(user) >= 1:
        update_result = user_collection.find_one_and_update(
            {"_id": ObjectId(id)},
            {"$set": user},
            return_document=ReturnDocument.AFTER,
        )
        if update_result is not None:
            return update_result
        else:
            raise HTTPException(status_code=404, detail=f"User {id} not found")
        
@router.delete("/{id}", response_description="Delete a student")
async def delete_student(id: str):
    """
    Remove a single user record from the database.
    """
    delete_result = user_collection.delete_one({"_id": ObjectId(id)})

    if delete_result.deleted_count == 1:
        return Response(status_code=status.HTTP_204_NO_CONTENT)

    raise HTTPException(status_code=404, detail=f"Student {id} not found")

@router.post(
    "/login",
    response_description="User login",
    response_model_by_alias=False
)
async def login(loginData: LoginModel = Body(...)):
    """
        Trả về 1 token hết hạn sau 15p
    """
    data = loginData.model_dump(by_alias=True)

    user = user_collection.find_one({"email": data['email'], "password": data['password']}, {"_id": 1})
    if user is None:
        raise HTTPException(status_code=401, detail=f"User not found")
    
    payload = {
        "userid": str(user["_id"]),
        "exp": datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(minutes=15)
    }
    token = jwt.encode(payload, "treenews", algorithm="HS256")
    return token



@router.put(
        "/{id}/changepassword",
        response_description="Change user password",
        response_model=UserModel,
        response_model_by_alias=False
)
async def changePassword(id: str, data: ChangePasswordModel = Body(...)):
    user = user_collection.find_one({"_id": ObjectId(id), "password": data.old_password})
    if user is None:
        raise HTTPException(status_code=400, detail="Mật khẩu cũ không đúng")
    
    update_result = user_collection.find_one_and_update(
        {"_id": ObjectId(id)},
        {"$set": {"password": data.new_password}},
        return_document=ReturnDocument.AFTER,
    )
    return update_result

@router.put("/{id}/changeavatar",
            response_description="Change user password",
            response_model=UserModel,
            response_model_by_alias=False
            )
async def updateImage(id: str, image: UploadFile = File(description="Thông tin hình ảnh đi kèm")):
    """
        Cập nhật ảnh đại diện
    """
    user = user_collection.find_one({"_id": ObjectId(id)})
    if user is None:
        raise HTTPException(status_code=404, detail=f"User {id} not found")
    
    if user['imgUrl']:
        old_img_path = os.path.join(server_storage_path, user['imgUrl'].split("/")[-1].replace("%5C", "/"))
        try:
            if os.path.exists(old_img_path):
                os.remove(old_img_path)
        except:
            pass

    user_assets_path = os.path.join(server_storage_path, id)
    os.makedirs(user_assets_path, exist_ok=True)

    #Thêm ảnh mới vào sv lưu trữ
    try:
        file_location = os.path.join(user_assets_path, image.filename)
        with open(file_location, "wb") as buffer:
                shutil.copyfileobj(image.file, buffer)
        
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Có lỗi khi upload ảnh, lỗi: {e}")
    
    #Xóa ảnh cũ
    
    
    image_url = f"http://localhost:8000/user/getavatar/{id}%5C{image.filename}"
    print(image_url)

    update_result = user_collection.find_one_and_update(
        {"_id": ObjectId(id)},
        {"$set": {"imgUrl": image_url}},
        return_document=ReturnDocument.AFTER,
    )
    return update_result
    
@router.get("/getavatar/{filename}")
async def get_image(filename: str):
    file_path = os.path.join(server_storage_path, filename)
    # print(file_path)
    if os.path.exists(file_path):
        return FileResponse(file_path)
    raise HTTPException(status_code=404, detail="Image not found")
