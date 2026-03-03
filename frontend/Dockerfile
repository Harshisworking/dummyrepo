FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# We use a relative path so the proxy handles the routing
ENV NEXT_PUBLIC_API_URL=/api
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]