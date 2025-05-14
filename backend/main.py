#tutorial: https://github.com/mongodb-developer/mongodb-with-fastapi/blob/master/app.py
#fastapi import
from fastapi import FastAPI, File, UploadFile, Body, HTTPException, Request
from fastapi.responses import JSONResponse, FileResponse
from fastapi.middleware.cors import CORSMiddleware

#routers import
from API import *

import os, shutil
from typing import List, Optional

from pydantic import BaseModel, model_validator, Field
from pydantic.functional_validators import BeforeValidator
import json
from typing_extensions import Annotated

app = FastAPI()

server_storage_path = r"D:/Python/server_storage/"
UPLOAD_FOLDER = './assets/images'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],  # Cho phép tất cả các phương thức (GET, POST, PUT, DELETE, ...)
    allow_headers=["*"],  # Cho phép tất cả các header
)

app.include_router(user_router, prefix="/user", tags=["users"])
app.include_router(category_router, prefix="/category", tags=["categories"])
app.include_router(article_router, prefix="/article", tags=["articles"])
app.include_router(comment_router, prefix="/comment", tags=["comments"])
app.include_router(voice_router, prefix="/command", tags=["voice"])
app.include_router(admin, prefix="/admin", tags=['admin'])

PyObjectId = Annotated[str, BeforeValidator(str)]

class Base(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    name: str
    point: Optional[float] = None
    is_accepted: Optional[bool] = False

# Tạo route cho trang chủ
@app.get("/")
def read_root():
    return {"message": "Hello, FastAPI!"}

# @app.middleware("http")
# async def log_requests(request: Request, call_next):
#     print(f"Request: {request.method} {request.url}")
#     print(f"Headers: {request.headers}")
#     body = await request.body()
#     print(f"Body: {body}")
#     response = await call_next(request)
#     print(f"Response status: {response.status_code}")
#     return response

@app.get("/uploads/{filename}")
async def get_image(filename: str):
    file_path = os.path.join(server_storage_path, filename)
    print(file_path)
    if os.path.exists(file_path):
        return FileResponse(file_path)
    raise HTTPException(status_code=404, detail="Image not found")

@app.post("/upload/")
async def upload_image(file: UploadFile = File(...)):
    try:
        # Lưu file vào thư mục "uploads"
        upload_folder = "uploads"
        os.makedirs(upload_folder, exist_ok=True)
        file_location = os.path.join(upload_folder, file.filename)

        with open(file_location, "wb") as f:
            shutil.copyfileobj(file.file, f)
        
        return {"filename": file.filename, "url": f"/uploads/{file.filename}"}
    except Exception as e:
        return JSONResponse(status_code=500, content={"message": str(e)})