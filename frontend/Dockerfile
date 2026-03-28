FROM node:20-alpine
WORKDIR /app

# 1. You MUST catch the ARG here (This comes from your docker-compose args)

COPY package*.json ./
RUN npm install
COPY . .

# 3. ONLY NOW do you run the build
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
