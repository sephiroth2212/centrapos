FROM node:14-alpine
RUN apk add --no-cache tini
WORKDIR /app/

COPY ./kete-server/package.json ./yarn.lock /app/
RUN yarn install --prod --frozen-lock-file

# yarn build should have created static assets
COPY ./kete-server/src /app/src
COPY ./kete-server/static /app/static

USER node
ENTRYPOINT ["/sbin/tini", "--", "node", "src/index.js" ]
