FROM node:22-alpine AS builder

RUN apk add --no-cache openssl

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn

COPY . .

RUN npx prisma generate
RUN yarn build

# Production stage
FROM node:18-alpine

RUN apk add --no-cache openssl

WORKDIR /app
COPY --from=builder /app/package.json ./
COPY --from=builder /app/yarn.lock ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma

# RUN npx prisma generate
RUN yarn --only=production

EXPOSE 3030

CMD ["yarn", "start"]