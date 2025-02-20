# Use Node.js base image
FROM node:18

WORKDIR /app

# Copy dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy app code
COPY . .

# Expose React port
EXPOSE 5173

CMD ["npm", "run", "dev","--host"]
