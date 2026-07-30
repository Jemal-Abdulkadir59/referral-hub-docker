# 1. Base image
FROM node:20

# 2. Set working directory
WORKDIR /app

# 3. Copy package files
COPY package*.json ./

# 4. Install dependencies
RUN npm install

# 5. Copy Prisma schema
COPY prisma ./prisma

# 6. Generate Prisma client
RUN npx prisma generate

# 7. Copy rest of app
COPY . .

# 8. Expose port
EXPOSE 8000

# 9. Run migrations + start server
CMD sh -c "npx prisma migrate deploy && node server.js"