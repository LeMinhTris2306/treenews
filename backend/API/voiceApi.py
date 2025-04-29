from fastapi import APIRouter, Body, HTTPException, status
from fastapi.responses import Response
import os
from dotenv import load_dotenv
from google import genai

router = APIRouter()
load_dotenv(r"D:\Python\treenews\backend\API\API_KEY.env")
api_key = os.getenv("API_KEY")
client = genai.Client(api_key=api_key)
# print(f"My API key is: {api_key}")

@router.put("/predict")
async def predict(speech_text: str = Body(...), commands: str = Body(...)):
    contents = f"Ý nghĩa câu '{speech_text}' thuộc đoạn nào trong '{commands}', chỉ cần trả về kết quả."

    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=contents,
    )

    return response.text