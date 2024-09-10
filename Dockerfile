# Etapa 1: Construir la aplicación
FROM node:20.16.0 AS build

# Establecemos el directorio de trabajo
WORKDIR /app

# Copiamos el package.json y package-lock.json
COPY package*.json ./

# Instalamos las dependencias
RUN npm install

# Copiamos todo el código de la aplicación
COPY . .

# Construimos la aplicación para producción
RUN npm run build

# Etapa 2: Configuración de Nginx para servir la aplicación React
FROM nginx:alpine

# Copiamos los archivos de construcción al directorio de Nginx
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Exponemos el puerto 80
EXPOSE 80

# Comando por defecto para ejecutar Nginx
CMD ["nginx", "-g", "daemon off;"]
