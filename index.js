import { providers, utils } from "ethers";
import fs from "fs";

//  Use api key for prod
const provider = new providers.InfuraProvider("homestead", {
  projectId: process.env.PROJECT_ID,
  projectSecret: process.env.SECRET,
});
const decoder = new utils.AbiCoder();

async function getBlockDetail() {
  // block 14348850 to 14348860
  const block = await provider.getBlock(14348850);
  // const block = await provider.getBlockWithTransactions(14348850);
  console.log(block);
}
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
async function getLogs() {
  const tx = await provider.getLogs({
    // fromBlock: 14348850,
    // toBlock: 14348860,
    blockHash:
      "0xf7d0a59f3cb515a97b28fc731028929f40da66f954bbc35b23089dabffa5f484",
    topics: [
      "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
    ],
  });
  // console.log(tx.filter((t) => t.topics.length === 4));
  const nft = tx.filter((t) => t.topics.length === 4);
  const json = JSON.stringify(nft);
  fs.writeFileSync("nft-data.json", json);
}

// getBlockDetail();
getTransactionDetail();
// getTransactionReceipt();
// getLogs();
