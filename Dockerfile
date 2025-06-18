# Etapa 1: build
FROM node:20-alpine AS builder

# Instala dependências necessárias
RUN apk add --no-cache libc6-compat

# Cria diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependência e instala
COPY package.json package-lock.json* pnpm-lock.yaml* ./
RUN npm install

# Copia o restante da aplicação
COPY . .

# Gera build de produção
RUN npm run build

# Etapa 2: produção
FROM node:20-alpine AS runner

# Instala dependências do sistema (caso precise de ffmpeg ou outros)
RUN apk add --no-cache ffmpeg

WORKDIR /app

ENV NODE_ENV production

# Copia apenas arquivos necessários da etapa de build
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Expõe a porta do Next.js
EXPOSE 3000

# Inicia o app Next.js
CMD ["npm", "start"]
