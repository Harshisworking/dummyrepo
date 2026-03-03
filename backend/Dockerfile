FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# This should match what your server.js listens on
ENV PORT=3002 
EXPOSE 3002
CMD ["node", "index.js"]