# Giai đoạn 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Giai đoạn 2: Serve build bằng nginx
FROM nginx:alpine

# Copy build từ giai đoạn trước
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy file cấu hình nginx tùy chọn
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 5173

CMD ["nginx", "-g", "daemon off;"]