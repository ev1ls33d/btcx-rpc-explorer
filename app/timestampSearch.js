const coreApi = require('./api/coreApi.js');

async function findBlockByTimestamp(targetTimestamp, currentHeight) {
    let low = 0;
    let high = currentHeight;
    let closestHeight = currentHeight;
    let closestDiff = Number.MAX_SAFE_INTEGER;

    while (low <= high) {
        let mid = Math.floor((low + high) / 2);
        let header = await coreApi.getBlockHeaderByHeight(mid);
        let diff = Math.abs(header.time - targetTimestamp);

        if (diff < closestDiff) {
            closestDiff = diff;
            closestHeight = mid;
        }

        if (header.time < targetTimestamp) {
            low = mid + 1;
        } else if (header.time > targetTimestamp) {
            high = mid - 1;
        } else {
            return mid;
        }
    }
    return closestHeight;
}

async function getInterestingBlockHeights(getblockchaininfo) {
    if (global.interestingBlockHeights) {
        return global.interestingBlockHeights;
    }

    const genesisTime = 1777777777;
    const currentHeight = getblockchaininfo.blocks;
    const currentTime = getblockchaininfo.mediantime || Math.floor(Date.now() / 1000);

    let res = {};
    
    const calculateOrAverage = async (offsetSeconds) => {
        let targetTime = genesisTime + offsetSeconds;
        if (targetTime <= currentTime) {
            return await findBlockByTimestamp(targetTime, currentHeight);
        } else {
            const avgBlockTime = (currentTime - genesisTime) / (currentHeight || 1);
            return Math.floor(offsetSeconds / avgBlockTime);
        }
    };

    res.firstDay = await calculateOrAverage(86400);
    res.firstWeek = await calculateOrAverage(604800);
    res.firstMonth = await calculateOrAverage(2592000);
    res.firstYear = await calculateOrAverage(31536000);

    global.interestingBlockHeights = res;
    return res;
}

module.exports = {
    findBlockByTimestamp,
    getInterestingBlockHeights
};
