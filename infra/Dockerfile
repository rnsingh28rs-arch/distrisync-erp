FROM node:22-alpine AS build
WORKDIR /app
COPY package.json ./
COPY api/package.json api/package.json
COPY web/package.json web/package.json
RUN npm install
COPY api api
COPY web web
RUN npm run build -w api && npm run build -w web
FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/api/dist api/dist
COPY --from=build /app/api/package.json api/package.json
COPY --from=build /app/web/dist web/dist
COPY package.json ./
COPY api/node_modules api/node_modules
EXPOSE 8080
CMD ["node","api/dist/server.js"]
