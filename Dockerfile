# Use official Node LTS image
FROM node:20-alpine AS builder

WORKDIR /app

COPY . .
RUN yarn install --frozen-lockfile
RUN yarn build

FROM node:20-alpine AS runtime
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --production --frozen-lockfile
COPY --from=builder /app/dist ./dist

EXPOSE 3000
ENV NODE_ENV=production
CMD ["node", "dist/main.js"]
