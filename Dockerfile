FROM node:20 as builder
WORKDIR /workspace
COPY . .
RUN npm install
RUN npm run css
RUN node ./bin/frontend-resource-integrity.js

FROM node:20-alpine
WORKDIR /workspace
COPY --from=builder /workspace .
RUN apk --update add git

ENV BTCEXP_HOST=0.0.0.0
ENV BTCEXP_PORT=3002
ENV BTCEXP_BITCOIND_HOST=127.0.0.1
ENV BTCEXP_BITCOIND_PORT=8332
ENV BTCEXP_BITCOIND_USER=
ENV BTCEXP_BITCOIND_PASS=
ENV BTCEXP_COIN=BTCX

CMD npm start
EXPOSE 3002

