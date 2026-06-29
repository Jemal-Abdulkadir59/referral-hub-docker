# 1. Base image
FROM node:20

# 2. Working directory
WORKDIR /app

# 3. Copy package files
COPY package*.json ./

# 4. Install dependencies
RUN npm install

# 5. Copy all files
COPY . .

# 1. ADD THESE LINES right before the build command:
ARG NEXT_PUBLIC_SERVER_API_URL
ARG NEXT_PUBLIC_CLIENT_API_URL
ARG NEXT_PUBLIC_DOCS_URL
ARG NEXT_PUBLIC_PRO_URL
ARG NEXT_PUBLIC_REPO_NAME

# 2. This maps the build args to environment variables during compilation
ENV NEXT_PUBLIC_SERVER_API_URL=$NEXT_PUBLIC_SERVER_API_URL
ENV NEXT_PUBLIC_CLIENT_API_URL=$NEXT_PUBLIC_CLIENT_API_URL
ENV NEXT_PUBLIC_DOCS_URL=$NEXT_PUBLIC_DOCS_URL
ENV NEXT_PUBLIC_PRO_URL=$NEXT_PUBLIC_PRO_URL
ENV NEXT_PUBLIC_REPO_NAME=$NEXT_PUBLIC_REPO_NAME

# 6. Build Next.js app
RUN npm run build

# 7. Expose port
EXPOSE 3000

# 8. Start app
CMD [ "npm", "start" ]

