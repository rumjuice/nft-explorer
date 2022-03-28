import dotenv from "dotenv";
import { providers } from "ethers";
import { getNFT, insertBlock, insertTx } from "./db.js";

dotenv.config();

//  Initialize blockchain provider
const provider = new providers.InfuraProvider("homestead", {
  projectId: process.env.PROJECT_ID,
  projectSecret: process.env.SECRET,
});

// Hash map of the block timestamp
let blockTimestamp = {};

async function getBlock(from, to) {
  for (let i = from; i <= to; i += 1) {
    const { number, hash, timestamp } = await provider.getBlock(i);
    const timeString = new Date(timestamp * 1000).toISOString();

    try {
      await insertBlock(number, hash, timeString);
    } catch (error) {
      throw new Error(error);
    }

    blockTimestamp[i] = timeString;
  }
}

async function getLogs(from, to) {
  const tx = await provider.getLogs({
    fromBlock: from,
    toBlock: to,
    // Filter topics of transfer events
    topics: [
      "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
    ],
  });
  // Filter ERC721 events
  const nft = tx.filter((t) => t.topics.length === 4);

  for (const n of nft) {
    try {
      await insertTx(n, blockTimestamp);
    } catch (error) {
      throw new Error(error);
    }
  }
}

async function getTribes(address) {
  try {
    return await getNFT(address);
  } catch (error) {
    throw new Error(error);
  }
}

export { getBlock, getLogs, getTribes };
