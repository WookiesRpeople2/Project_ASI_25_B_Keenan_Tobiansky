# light wight distrabution of linux
FROM node:21.7.0-alpine

ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT 80

WORKDIR /application
COPY . .

RUN npm install
RUN npm run format
RUN npm run build

# as to not execute commands as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

USER root

RUN curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
RUN chmod +x /usr/local/bin/docker-compose

ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

RUN touch .env
RUN echo "DATABASE_URL=${DATABASE_URL}" >>.env

USER nextjs

RUN docker-compose up -d
RUN npx prisma db generate
RUN npx pris db push
RUN npx prisma db seed

CMD ["npm", "run", "start"]
