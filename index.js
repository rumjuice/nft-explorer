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

async function getTransactionDetail() {
  const tx = await provider.getTransaction(
    "0x6a88d3b241e09f011947bcad4b2b5fae9e4080c8ff6a5ae9c6d76e0d11c7ece1"
  );
  console.log(tx);
}
async function getTransactionReceipt() {
  const tx = await provider.getTransactionReceipt(
    // "0xc7ff98f1eecc18b7bbfefd299bc7c8682c91df9a7ec0bab1a84b764f21a5c099"
    "0xca1782ed1ebf2ff6bad53c4cf84f5ce910f20bbc4c4402ea62032ec68d754ec2"
  );
  console.log(tx.logs);
  // console.log(tx.logs.map((l) => l.topics));

  // topics.length = 4 ==> nft transfer
  const topics = [
    // transfer event signature
    "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
    // from
    "0x0000000000000000000000000000000000000000000000000000000000000000",
    // to
    "0x000000000000000000000000ae9deddf056811f91fb58208a0ef973e1eecc911",
    // token id
    "0x0000000000000000000000000000000000000000000000000000000000000c52",
  ];
}

// getTransactionDetail();
// getTransactionReceipt();
