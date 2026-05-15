FROM node:14.19 AS builder

ARG BACK_ARG
ARG ENV_ARG

WORKDIR /frontend

ENV REACT_APP_BACK=$BACK_ARG
ENV REACT_APP_ENV=$ENV_ARG

COPY package.json package.json

RUN npm i -D @types/eslint@8.4.3
RUN npm install

COPY public public/

COPY src src/

COPY scripts scripts/

COPY config config/

RUN npm run-script build

FROM nginx:1.23.1

WORKDIR /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d

COPY --from=builder /frontend/build .