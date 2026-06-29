# 1. Base image (FIXED ✅)
FROM node:20

# 2. Set working directory
WORKDIR /app

# 3. Copy package files
COPY package*.json ./

# 4. Install dependencies inside container
RUN npm install

# 5. Copy app source
COPY . .

# 6. Expose port
EXPOSE 8000

# 7. Start app
CMD ["node", "server.js"]