FROM node:18-alpine

WORKDIR /app

# Copier les fichiers de configuration
COPY package.json package-lock.json* ./

# Installer les dépendances
RUN npm ci || npm install

# Copier le code source
COPY . .

# Builder l'application
RUN npm run build

# Exposer le port
EXPOSE 3000

# Démarrer l'application
CMD ["node", "dist/main"]