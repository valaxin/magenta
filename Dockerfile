ARG NODE_VERSION=${NODE_VERSION}
FROM node:${NODE_VERSION}-alpine

WORKDIR /usr/src/app
RUN chown node:node /usr/src/app
USER node

# Dependencies only. Source is bind-mounted at runtime (see docker-compose.yml).
COPY --chown=node:node app/package*.json ./
RUN npm install

EXPOSE ${INTERNAL_PORT} ${DEBUG_PORT}
CMD ["node", "--watch", "index.js"]

