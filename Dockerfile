FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn

COPY . .

RUN npx prisma generate
RUN yarn build
# RUN yarn install --production --ignore-scripts --prefer-offlin

FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/package.json ./
COPY --from=builder /app/yarn.lock ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/public ./public

RUN yarn --only=production

EXPOSE 3030

CMD ["yarn", "start"]