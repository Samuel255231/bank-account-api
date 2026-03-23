# Stage 1: Build
FROM node:18-alpine AS builder
WORKDIR /app
# Installer pnpm
RUN npm install -g pnpm
# Copier les fichiers de configuration
COPY package.json pnpm-lock.yaml ./
# Installer les dépendances
RUN pnpm install --frozen-lockfile
# Copier le code source
COPY . .
# Builder l'application
RUN pnpm run build

# Stage 2: Production
FROM node:18-alpine
WORKDIR /app
# Installer pnpm
RUN npm install -g pnpm
# Copier les fichiers nécessaires
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
# Exposer le port
EXPOSE 3000
# Démarrer l'application
CMD ["pnpm", "run", "start:prod"]