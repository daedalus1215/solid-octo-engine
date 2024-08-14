# Build Image
FROM node:20.16.0

# Set up app directory
ENV PORT=3001
ARG WORK_DIR=/usr/src/app
WORKDIR $WORK_DIR

# copy package files
COPY package*.json ./
COPY . .

RUN npm install -g @nestjs/cli
RUN npm install

RUN npm run build

RUN node -v

# Ports
EXPOSE 80 443 3000

CMD ["node", "dist/apps/auth/main.js"]