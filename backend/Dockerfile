# Dockerfile

# Bước 1: Chọn image Python chính thức
FROM python:3.9-slim

# Bước 2: Cài đặt thư viện cần thiết
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Bước 3: Copy mã nguồn vào container
COPY . .

# Bước 4: Mở port 80 cho ứng dụng
EXPOSE 8000

# Bước 5: Chạy ứng dụng bằng uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]