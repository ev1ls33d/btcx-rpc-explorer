# BTCX RPC Explorer (POCX Fork)

## Self-Hosted BitcoinX explorer for everyone running a POCX Node.

![homepage](./public/img/screenshots/homepage.png)

This is a self-hosted explorer for the BitcoinX (POCX) blockchain, driven by RPC calls to your own [POCX Node](https://github.com/PoC-Consortium/bitcoin). It is easy to run and fully compatible with the custom Proof of Capacity (PoC) consensus parameters and transaction implementations of the POCX fork.

### What's new in this fork?

- **POCX Consensus Native Support:** The explorer fully recognizes custom PoC network variables like `base_target`, `nonce`, `poc_time`, `generation_signature`, `pocx_proof`, and signer data.
- **Custom Native Token (BTCX):** The explorer is updated to support BTCX and mBTCX natively with the proper currency conversions.
- **Docker Ready:** Built-in dockerization exposes all necessary environment variables to get started with zero manual setup.
- **Automated CI/CD:** Auto-publishes to GitHub Packages for simple container management.

## Quick Start using Docker

You can run the explorer using our pre-published Docker image. Below is an example connecting it to a containerized `pocd` node on the same network (`pocx` network):

```bash
docker run --name pocxp -dit --net=pocx \
        -p 3002:3002 \
        -e BTCEXP_HOST=0.0.0.0 \
        -e BTCEXP_BITCOIND_HOST=pocd \
        -e BTCEXP_BITCOIND_PORT=8332 \
        -e BTCEXP_BITCOIND_USER=miner \
        -e BTCEXP_BITCOIND_PASS=password \
        -e BTCEXP_COIN=BTCX \
        ghcr.io/ev1ls33d/btcx-rpc-explorer:master
```

*Note: Replace `ghcr.io/your-username/btcx-rpc-explorer:latest` with your specific GitHub container registry package or Docker Hub package if published elsewhere.*

Then, simply open `http://localhost:3002` in your web browser.

### Environment Variables

The most important environment variables are exposed right out of the box in our Dockerfile, including:

- `BTCEXP_HOST` - The host interface the app binds to (default: `0.0.0.0` in Docker).
- `BTCEXP_PORT` - The port the app listens on (default: `3002`).
- `BTCEXP_BITCOIND_HOST` - Your POCX node IP address or hostname.
- `BTCEXP_BITCOIND_PORT` - Your POCX node RPC port.
- `BTCEXP_BITCOIND_USER` - RPC user for your POCX node.
- `BTCEXP_BITCOIND_PASS` - RPC password for your POCX node.
- `BTCEXP_COIN` - Setting the network coin parameter (configured automatically as `BTCX`).

See the underlying `app/config.js` or standard BTC RPC Explorer documentation for more advanced variables.

---

### Development / Manual Setup

If you prefer to run from source without Docker:

1. `npm install`
2. Configure your node environment variables.
3. `npm start`

And your explorer should be accessible on port 3002.



Or, via a lightning address:

thanks@donate.btc21.org


[npm-ver-img]: https://img.shields.io/npm/v/btc-rpc-explorer.svg?style=flat
[npm-ver-url]: https://www.npmjs.com/package/btc-rpc-explorer
[npm-dl-img]: http://img.shields.io/npm/dm/btc-rpc-explorer.svg?style=flat
[npm-dl-url]: https://npmcharts.com/compare/btc-rpc-explorer?minimal=true

[npm-dl-weekly-img]: https://badgen.net/npm/dw/btc-rpc-explorer?icon=npm&cache=300
[npm-dl-monthly-img]: https://badgen.net/npm/dm/btc-rpc-explorer?icon=npm&cache=300
[npm-dl-yearly-img]: https://badgen.net/npm/dy/btc-rpc-explorer?icon=npm&cache=300
[npm-dl-alltime-img]: https://badgen.net/npm/dt/btc-rpc-explorer?icon=npm&cache=300&label=total%20downloads

