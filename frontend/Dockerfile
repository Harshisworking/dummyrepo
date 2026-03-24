FROM node:20-alpine
WORKDIR /app

# 1. You MUST catch the ARG here (This comes from your docker-compose args)
ARG NEXT_PUBLIC_API_URL

# 2. You MUST set it as an ENV here so the build process can "see" it
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

COPY package*.json ./
RUN npm install
COPY . .

# 3. ONLY NOW do you run the build
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
