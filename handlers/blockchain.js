import dotenv from "dotenv";
import { providers } from "ethers";
import { insertBlock, insertTx } from "./db.js";

dotenv.config();

//  Initialize blockchain provider
const provider = new providers.InfuraProvider("homestead", {
  projectId: process.env.PROJECT_ID,
  projectSecret: process.env.SECRET,
});

// Hash map of block timestamp
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

  // const block = await provider.getBlock(14348850);
  // console.log(block);
  // const json = JSON.stringify(block);
  // fs.writeFileSync("block-data.json", json);
}

async function getLogs(from, to) {
  const tx = await provider.getLogs({
    fromBlock: from,
    toBlock: to,
    // blockHash:
    //   "0xf7d0a59f3cb515a97b28fc731028929f40da66f954bbc35b23089dabffa5f484",
    // Transfer event
    topics: [
      "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
    ],
  });

  const nft = tx.filter((t) => t.topics.length === 4);

  for (const n of nft) {
    try {
      await insertTx(n, blockTimestamp);
    } catch (error) {
      throw new Error(error);
    }
  }

  // const json = JSON.stringify(nft);
  // fs.writeFileSync("nft-data.json", json);
}

const getTribes = () => {
  // 0x5930DB0F73b9bCF40F42d72DABbFdd16249EC5Be
};

export { getBlock, getLogs };
