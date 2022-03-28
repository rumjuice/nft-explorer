import { getBlock, getLogs, getTribes } from "./handlers/blockchain.js";
import { closeConnection } from "./handlers/db.js";

const startBlock = 14348850;
const endBlock = 14348860;
const tribes = "0x5930DB0F73b9bCF40F42d72DABbFdd16249EC5Be";

await getBlock(startBlock, endBlock);
await getLogs(startBlock, endBlock);

const tribesNFT = await getTribes(tribes);
console.log("\nTri3es NFT:");
console.log(tribesNFT);

closeConnection();
