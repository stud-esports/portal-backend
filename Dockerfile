FROM node:16.15.1-alpine3.16
RUN apk add --no-cache bash python3 make g++ postgresql-client
#RUN apk add --no-cache postgresql-client

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

COPY backend-init.sh /backend-init.sh
RUN chmod +x /backend-init.sh
ENTRYPOINT [ "bash", "/backend-init.sh"]
