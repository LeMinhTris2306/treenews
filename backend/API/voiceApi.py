from fastapi import APIRouter, Body, HTTPException, status
from fastapi.responses import Response
import os
from dotenv import load_dotenv
from google import genai

router = APIRouter()
load_dotenv(r"D:\Python\treenews\backend\API\.env")
api_key = os.getenv("API_KEY")
client = genai.Client(api_key=api_key)
# print(f"My API key is: {api_key}")

@router.post("/predict")
async def predict(transcript: str = Body(...), commands: str = Body(...)):
    contents = f"Ý nghĩa câu '{transcript}' thuộc đoạn nào trong mảng các hành động '{commands}', chỉ cần trả về kết quả nằm trong mảng, không cần nói gì thêm."

    response = client.models.generate_content(
        model="gemini-2.0-flash-lite-001",
        contents=contents,
    )
    print(response.text)
    return response.text