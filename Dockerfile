FROM node:18-alpine AS builder

WORKDIR /usr/src/app

# Instala TypeScript y dependencias
COPY package*.json ./
RUN npm install

# Copia el código fuente (archivos .ts)
COPY . .

# Ejecuta la compilación de TypeScript (asume que tienes un script 'build' en package.json)
# Este comando crea la carpeta de salida (e.g., 'dist' o 'build') con archivos .js
RUN npm run build

# ---
# ETAPA 2: Ejecución (Runtime)
FROM node:20-alpine

# Define el directorio de trabajo
WORKDIR /usr/src/app

# Copia solo los archivos JavaScript compilados y las dependencias de producción
# Cambia 'dist' por el nombre de tu carpeta de salida si es diferente
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package.json ./package.json

# Define la variable de entorno para la configuración de Node.js
ENV NODE_ENV production

# Expone el puerto de la aplicación
EXPOSE 3000

# El comando de inicio debe apuntar al archivo JavaScript compilado
# Por ejemplo: CMD [ "node", "dist/index.js" ]
# Ajusta 'dist/index.js' a tu punto de entrada real
CMD [ "node", "dist/index.js" ]