### Setup of https://bitcoin-pocx-po.cx on Ubuntu 20.04

	# update and install packages
	apt update
	apt upgrade
	apt install docker.io
	
	# get source, npm install
	git clone https://github.com/janoside/btcx-rpc-explorer.git
	cd btcx-rpc-explorer
	
	# build docker image
	docker build -t btcx-rpc-explorer .

	# run docker image: detached mode, share port 3002, sharing config dir, from the "btcx-rpc-explorer" image made above
	docker run --name=btcx-rpc-explorer -d -v /host-os/env-dir:/container/env-dir --network="host" btcx-rpc-explorer
	