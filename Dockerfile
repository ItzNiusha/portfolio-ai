FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build && npm run export


FROM nginx:alpine


RUN rm -rf /usr/share/nginx/html/*


COPY --from=builder /app/out /usr/share/nginx/html



EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]