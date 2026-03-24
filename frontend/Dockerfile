FROM node:20-alpine

# 1. Declare the ARGs so Docker knows to expect them from Compose
ARG NEXT_PUBLIC_API_URL
ARG PROJECT_NAME

# 2. Set them as ENV variables so the 'npm run build' process can see them
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV PROJECT_NAME=$PROJECT_NAME

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# 3. NOW run the build - it will find the variables and bake them in
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
