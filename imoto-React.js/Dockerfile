FROM node

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ARG API_URL
ENV API_URL $API_URL

COPY package.json /usr/src/app/
COPY yarn.lock /usr/src/app/
RUN yarn

COPY . /usr/src/app

RUN yarn run production-build
RUN cd mock-server && yarn

CMD [ "yarn", "run", "production" ]
